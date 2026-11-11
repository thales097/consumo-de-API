function Destaque({ destaque }) {
  return (
    <>
      {destaque && (
        <>
          <h2>{destaque.Title}</h2>

          {destaque.Poster !== 'N/A' && (
            <img src={destaque.Poster} alt={destaque.Title} />
          )}
        </>
      )}
    </>
  )
}

export default Destaque