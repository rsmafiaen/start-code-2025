'use client'

import { Header } from "@/components/header/header"
import { useSearchParams } from "next/navigation"

export default function SearchPage(){
    const searchParams = useSearchParams()
 
  const search = searchParams.get('search')

  console.log(search)

  return(
    <div>
        <Header />
    </div>
  )
}