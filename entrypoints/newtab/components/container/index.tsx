export default function Container({ children }: React.PropsWithChildren) {
  return (
    <div className="h-screen w-screen overflow-auto scroll-smooth pt-20">
      <div className="mx-auto max-w-5xl px-[10%]">{children}</div>
    </div>
  );
}
