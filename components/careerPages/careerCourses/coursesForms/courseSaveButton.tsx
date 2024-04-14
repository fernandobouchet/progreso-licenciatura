import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import { LoginButton } from "@/components/auth/loginButton";

interface Props {
  disableSendButton: boolean;
}

const CourseSaveButton = ({ disableSendButton }: Props) => {
  const session = useSession();

  return (
    <>
      {session.status === "authenticated" ? (
        <Button
          variant="default"
          disabled={disableSendButton}
          type="submit"
          className="ml-auto"
        >
          Guardar
        </Button>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="default"
              disabled={disableSendButton}
              type="button"
              className="ml-auto"
            >
              Guardar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="border-none">
            <AlertDialogHeader>
              <AlertDialogTitle>Es necesario iniciar sesión.</AlertDialogTitle>
              <AlertDialogDescription>
                Para poder guardar el progreso es necesario que inicies sesión
                con tu cuenta de Google.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction asChild>
                <LoginButton />
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export { CourseSaveButton };
