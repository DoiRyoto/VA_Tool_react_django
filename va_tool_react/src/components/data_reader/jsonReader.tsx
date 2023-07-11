// https://react-papaparse.js.org/docs


function JSONReader(props: any) {
  const setDataOnChanged = (event: any) => {
    console.log(event.target.result)
  }

  return (
    <input type="file" onChange={(event) => setDataOnChanged(event)} />
  )
}

export default JSONReader