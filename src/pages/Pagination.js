import React from "react";
import { NavLink } from "react-router-dom";

const Pagination = ({itemsPerPage,totalItems,paginate})=>{
    const pageNumbers = [];
    for(let i=0;i<= Math.ceil(totalItems/itemsPerPage);i++)
    {
        pageNumbers.push(i);
    }
    return(
        <nav>
            <ul className = 'pagination'>
                {pageNumbers.map(number=>(
                    <li key={number} className='page-item'>
                        {/* <a onClick={()=>paginate(number)} href='' className = 'page-link'> */}
                         <NavLink to="/lead" onClick={()=>paginate(number)} className = 'page-link'>
                            {number}
                         </NavLink>
                        {/* </a> */}
                    </li>
                ))}

            </ul>
        </nav>
    );
};

export default Pagination;