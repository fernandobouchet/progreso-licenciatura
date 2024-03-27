import AppLogo from "@/components/navigation/appLogo";
import { LoginButton } from "@/components/auth/loginButton";

const Login = async () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-5 w-4/5">
      <AppLogo />
      <h2 className="text-center font-medium">
        ¡Bienvenido a progreso de carrera informática!
      </h2>
      <p className="text-center">
        Aquí puedes controlar fácilmente tu progreso académico al registrar tus
        calificaciones y el estado de tu cursada, además de acceder a
        estadísticas sobre tu rendimiento y avances en la carrera.
      </p>
      <p className="text-center">
        Para almacenar tu progreso y ofrecerte una experiencia personalizada, te
        invitamos a iniciar sesión con tu cuenta de Google.
      </p>
      <LoginButton />
    </div>
  );
};

export { Login };
