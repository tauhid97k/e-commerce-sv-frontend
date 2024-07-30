import { LoaderCircle } from 'lucide-react'

const Loading = () => {
  return (
    <div className="h-full grid place-items-center">
      <LoaderCircle className="stroke-1 size-12 animate-spin text-primary/70" />
    </div>
  )
}

export default Loading
