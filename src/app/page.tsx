import Header from "@/components/header"


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <h1 className="text-3xl font-bold text-center py-8">My E-Commerce Store</h1>
      <p className="text-center text-gray-600">Connection sucessfull :)</p>
    </div>
  )
}
