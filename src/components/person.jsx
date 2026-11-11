function Person({ person }) {
  return (
    <div>
      <h1>{person[1]?.nome}</h1>
    </div>
  )
}

export default Person