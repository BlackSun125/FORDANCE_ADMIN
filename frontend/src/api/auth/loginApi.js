import { supabase } from "../../global-variables/supabase";

async function GetUsernameAndPassword(username){
    const res = await supabase.from('users').select('username , password').eq('username',`${username}`);
    return res.data;
}

export const login = {GetUsernameAndPassword};