const LoadingBar = () => {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center bg-background z-10">
      <div className="relative h-2 w-3/4 sm:w-1/2 bg-muted rounded">
        <div className="relative top-0 h-2 w-full rounded overflow-hidden after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:-translate-x-full after:bg-primary after:animate-loader" />
      </div>
    </div>
  );
};

export { LoadingBar };
