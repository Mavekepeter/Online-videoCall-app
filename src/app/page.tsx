import Image from "next/image";
import { Button } from "@/components/ui/button";
import {

  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
export default function Home() {
  return (
   <div className="m-10">
    <SignInButton>
      <Button>
        log in
      </Button>
    </SignInButton>
   </div>
  );
}

