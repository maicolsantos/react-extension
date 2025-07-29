export const Posts = ({ data }: any) => {
  return (
    <li className="list-none mb-4 cursor-grab flex items-center gap-4">
      <img src={data.mainImage.url} alt={data.title} className="max-w-1/5" />
      <div>
        <p>{data.title}</p>
        <div className="flex gap-4">
          <small><b>Parceiros: </b>{data.partner.title}</small>
          <small><b>Categoria: </b>{data.category.name}</small>
        </div>
      </div>
    </li>
  )
}
