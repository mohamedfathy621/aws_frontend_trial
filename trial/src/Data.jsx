const Data = ({cols,rows}) =>{
    return(
        <>
            <table className="table">
                <thead>
                    <tr>
                    {cols.map((col)=><th scope="col">{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row)=>
                    <tr scope="row">
                        {row.map((item)=><td scope="col">{item}</td>)}
                    </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}
export default Data
