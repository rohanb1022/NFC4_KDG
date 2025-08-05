import './App.css'
import { Button } from "@/components/ui/button"

function App() {
  return (
    <>
       <h1 class="text-3xl font-bold text-amber-500 underline">
    Hello world!
  </h1>
  <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
    </>
  )
}

export default App
