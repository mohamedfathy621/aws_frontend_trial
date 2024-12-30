const TableMenu= ({tables,settable})=>{
    return(
        <div className='row' style={{marginTop:"20px"}}>
        {tables.map((table)=>
        <div className='col-4' onClick={()=>settable([table[1],table[2]])} key={table[0]}>
            <div style={{border:"1px solid grey",borderRadius:"10px",padding:"5px",cursor:"pointer",margin:"5px"}}>
              {table[0]}
            </div>
        </div>
        )}
     </div>
    )
}
export default TableMenu