import { useEffect, useRef, useState } from "react";
import { Posts } from "./components/Posts";

function App() {
  const [postsData, setPostsData] = useState<any>();
  const articleMainRef = useRef<HTMLElement | null>(null);
  const dragCounter = useRef(0);

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

  const setContentDropped = (data: any) => {
    const headingMain = document.querySelector('.article-main h3 a') as HTMLElement
    const picture = document.querySelector('.article-main picture') as HTMLElement
    const partner = document.querySelector('.article-main .partner') as HTMLElement

    headingMain.innerHTML = data.title
    picture.innerHTML = `<picture><img src="${data.mainImage.url}" alt="${data.title}"></picture>`
    partner.innerHTML = `
      <img src="${data.partner.image.url}" alt="${data.partner.image.alt}">
      <span>${data.partner.title}</span>
    `
  }

  useEffect(() => {
    const articleMain = document.querySelector('.article-main') as HTMLElement
    articleMainRef.current = articleMain;

    if (!articleMain) return;

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const handleDragEnter = (event: DragEvent) => {
      event.preventDefault();
      dragCounter.current += 1;
      articleMain.style.borderRadius = '8px';
      articleMain.style.opacity = '0.5';
      articleMain.style.boxShadow = 'rgb(0 0 0) 0px 0px 0px 6px, rgba(255, 255, 255, 0.5) 0px 0px 0px 8px';
    };

    const handleDragLeave = () => {
      dragCounter.current -= 1;
      if (dragCounter.current === 0) {
        articleMain.style.borderRadius = '0px';
        articleMain.style.opacity = '1';
        articleMain.style.boxShadow = 'none';
      }
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      dragCounter.current = 0;
      articleMain.style.borderRadius = '0px';
      articleMain.style.opacity = '1';
      articleMain.style.boxShadow = 'none';

      if (!event.dataTransfer) return;
      const data = event.dataTransfer.getData('text/plain');
      console.log('Dropped data:', data);
    };

    // Register events
    articleMain.addEventListener('dragover', handleDragOver);
    articleMain.addEventListener('dragenter', handleDragEnter);
    articleMain.addEventListener('dragleave', handleDragLeave);
    articleMain.addEventListener('drop', handleDrop);

    getPostsData();

    // Cleanup
    return () => {
      articleMain.removeEventListener('dragover', handleDragOver);
      articleMain.removeEventListener('dragenter', handleDragEnter);
      articleMain.removeEventListener('dragleave', handleDragLeave);
      articleMain.removeEventListener('drop', handleDrop);
    };
  }, [])

  return (
    <div className="p-4">
      <ul>
        {(postsData?.docs || [])?.map((post: any) => (
          <Posts key={post.id} data={post} onDragEnd={setContentDropped} />
        ))}
      </ul>
    </div>
  )
}

export default App
