const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-blue-50 font-inter">
      {children}
    </main>
  );
};

export default AuthLayout;
