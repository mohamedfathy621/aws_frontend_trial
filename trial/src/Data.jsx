const Data = ({cols,rows}) =>{
    return(
        <>
            <table className="table">
                <thead>
                    <tr>
                    {cols.map((col,index)=><th scope="col" key={col+"_"+index}>{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row,index)=>
                    <tr scope="row" key={index}>
                        {row.map((item,sub_index)=><td scope="col" key={item+"_"+index+"_"+sub_index}>{item}</td>)}
                    </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}
export default Data
