// app/about/layout.tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white  w-full ">
      <main>{children}</main> {/* <== Di sini konten page.tsx masuk */}
    </div>
  );
}