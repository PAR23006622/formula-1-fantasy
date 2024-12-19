import { createClient } from "@/lib/supabase/server";
import { SignUpSchema } from "@/lib/validations/auth";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = SignUpSchema.parse(body);

    const supabase = createClient();

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", validatedData.email)
      .single();

    if (existingUser) {
      return Response.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create user
    const { data: user, error } = await supabase
      .from("users")
      .insert([
        {
          email: validatedData.email,
          password: hashedPassword,
          name: validatedData.name,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating user:", error);
      return Response.json(
        { error: "Error creating user" },
        { status: 500 }
      );
    }

    return Response.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in signup route:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}