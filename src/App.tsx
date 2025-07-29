import { useEffect, useState } from "react";
import { Posts } from "./components/Posts";

function App() {
  const [postsData, setPostsData] = useState<any>();

  // const getBlockHighlightsTrackerLinks = async () => {
  //   const trackerLinksData = Array.from(document.querySelectorAll('.block-highlights [data-trackerlink]')).map(i => Array.from(i.attributes)[3].value)
  //   return trackerLinksData
  // }

  const getPostsData = async () => {
    const response = await fetch(`http://localhost:3001/posts`)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    setPostsData(data)
  }

  // const getBlockDataCMS = async () => {
  //   const trackerLinks = await getBlockHighlightsTrackerLinks()
  //   console.log('💀 ~ getBlockDataCMS ~ trackerLinks:', trackerLinks)

  //   const response = await fetch('http://localhost:3001/block?where[name][equals]=Início%20-%20Manchetes&page=1', {
  //     // credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // 'x-api-code': '6d840d72-82b7-4f72-8edb-14b27cacba9c',
  //       // 'x-api-key': '5f69796e-2505-479c-a838-a7df0bd95b95'
  //     }
  //   })

  //   if (!response.ok) {
  //     throw new Error('Network response was not ok')
  //   }

  //   const data = await response.json()
  //   return data
  // }

  useEffect(() => {
    getPostsData()
  }, [])

  console.log(postsData?.docs);


  return (
    <div className="p-4">
      <ul>
        {(postsData?.docs || [])?.map((post: any) => (
          <Posts key={post.id} data={post} />
        ))}
      </ul>
    </div>
  )
}

export default App
