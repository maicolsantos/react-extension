export const Posts = ({ data, onDragEnd }: any) => {
  return (
    <li
      className="list-none mb-4 cursor-grab flex items-center gap-4"
      draggable
      onDragEnd={() => onDragEnd(data)}
    >
      <img src={data.mainImage.url} alt={data.title} className="max-w-1/5" />
      <div>
        <p>{data.title}</p>
        <div className="flex gap-4">
          <small><b>Parceiros: </b>{data.partner.title}</small>
          <small><b>Categoria: </b>{data.category.name}</small>
        </div>
        <small>
          <div className="flex gap-2">
            <b>Tags: </b>
            {data.tags.map((tag: any) => (
              <span key={tag.id}>{tag.title}</span>
            ))}
          </div>
        </small>
      </div>
    </li>
  )
}
