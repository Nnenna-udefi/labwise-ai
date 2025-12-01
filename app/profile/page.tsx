import { createClient } from "@/src/lib/supabaseServerClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/ui/avatar";
import { Button } from "@/src/ui/button";
import { Input } from "@/src/ui/input";
import { User } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) redirect("/auth/login");

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-primary font-headline sm:text-4xl">
          Your Profile
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="shadow-lg bg-foreColor p-4">
        <div>
          <h2 className="text-black font-bold text-xl md:text-3xl">
            Account Information
          </h2>
          <p className="text-foreground/80 py-3">
            Update your personal details here.
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 border">
              <AvatarImage
                src="https://picsum.photos/seed/123/200/200"
                alt="User avatar"
              />
              <AvatarFallback>
                <User className="h-10 w-10 text-primary" />
              </AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Photo</Button>
          </div>
          <div className="space-y-2">
            <label htmlFor="fullName" className="pb-4">
              Full Name
            </label>
            <Input id="fullName" defaultValue={user.user_metadata.full_name} />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="pb-4">
              Email Address
            </label>
            <Input id="email" type="email" defaultValue={user.email} disabled />
          </div>
          <Button>Update Profile</Button>
        </div>
      </div>
    </div>
  );
}
