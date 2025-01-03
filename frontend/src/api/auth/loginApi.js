import { supabase } from "../../global-variables/supabase";

async function loginWithEmailAndPassword(email, password) {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (authError) {
        throw new Error(authError.message);
    }

    const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (userError) {
        throw new Error(userError.message);
    }

    // Kiểm tra vai trò của người dùng (chỉ cho phép role là 'admin')
    if (userData.role !== 'admin') {
        throw new Error("You do not have admin privileges");
    }

    return { ...authData, user: userData };
}

export const login = { loginWithEmailAndPassword };
