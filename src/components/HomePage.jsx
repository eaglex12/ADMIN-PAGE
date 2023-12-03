import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaChevronLeft, FaAngleDoubleLeft, FaChevronRight, FaAngleDoubleRight } from 'react-icons/fa';

import './style.css';



function HomePage() {


    let [allData, setAllData] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    let [totalPages, setTotalPages] = useState(1);
    let [selectedRows, setSelectedRows] = useState([]);
    let [searchT, setSearchT] = useState('');



    let itemsPerPage = 10;


    useEffect(() => {
        async function testing() {

            try {
                let respData = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
                console.log(respData);
                if (respData && respData.data) {
                    setAllData(respData.data);
                    setTotalPages(Math.ceil(respData.data.length / itemsPerPage));
                }

            } catch (error) {

                console.error('Error aagya :', error);
            }

        }
        testing();
    }, [itemsPerPage]);


    const handlePageClick = (page) => {

        setCurrentPage(page);
    };

    const handleCheckbox = (id) => {
        console.log(allData);

        let updatedSelectedRows;


        if (id === 'selectAll') {
            updatedSelectedRows = selectedRows.length === allData.length ? [] : allData.map(row => row.id);
        } else {
            updatedSelectedRows = selectedRows.includes(id)
                ? selectedRows.filter(rowId => rowId !== id)
                : [...selectedRows, id];
        }

        setSelectedRows(updatedSelectedRows);
    };

    const handleSearch = () => {
        const searchTerm = searchT.toLowerCase();
        const filteredData = allData.filter(user =>
            user.name.toLowerCase().includes(searchTerm)
        );

        setAllData(filteredData);
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
        setCurrentPage(1);
    };


    const handleEdit = (e) => {




        console.log('e hai', e);




    }
    const handleDelete = (e) => {
        let updatedData = [...allData];

        updatedData.splice(e, 1);

        setAllData(updatedData);


        console.log(allData);






    }









    return (
        <>
            <div>
                <div>
                    <div>
                        <div><input type="search" name="" placeholder="Enter Value..." style={{
                            "outline": "none",
                            "height":"40px"
                        }} id=""

                            value={searchT}
                            onChange={(e) => setSearchT(e.target.value)}

                            onKeyDown={(e) => {



                                if (e.key === 'Enter') {
                                    handleSearch();
                                }

                            }
                            } /></div>
                        <div><img src="" alt="" /></div>

                    </div>
                    <div>
                        <table>

                            <thead>

                                <tr>
                                    <th><input type="checkbox" name="" id="selectAll"
                                        onChange={() =>


                                            handleCheckbox('selectAll')} /></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>


                                {
                                    allData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((value, index) => (
                                        <tr key={index} className={selectedRows.includes(value.id) ? "selected-row" : ""}>

                                            <td><input type="checkbox" name="" id=""
                                                checked={selectedRows.includes(value.id)}
                                                onChange={() => handleCheckbox(value.id)} />
                                            </td>
                                            <td>{value.name}</td>
                                            <td>{value.email}</td>
                                            <td>{value.role}</td>
                                            <td>
                                                <div className="icon-box"
                                                    onClick={() => handleEdit(index)}><FaEdit /></div>
                                                <div className="icon-box"

                                                    style={{
                                                        color: 'red'
                                                    }}
                                                    onClick={() => handleDelete(index)}><FaTrash /></div>
                                            </td>
                                        </tr>
                                    ))
                                }


                            </tbody>


                        </table>
                    </div>
                    <div>


                    
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <div>{selectedRows.length > 0 ? `${selectedRows.length} of ${allData.length} row(s) selected.` : `${0} of ${allData.length} row(s) selected.`}</div>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }
                            }>

                                <div>Page {currentPage} of {totalPages}</div>
                                <div>
                                    <span className="pagination-icon"
                                        onClick={() => handlePageClick(1)


                                        }><FaAngleDoubleLeft /></span>
                                    <span className="pagination-icon"
                                        onClick={() => handlePageClick(currentPage > 1 ? currentPage - 1 : 1)



                                        }><FaChevronLeft size={14} /></span>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <div
                                            key={i + 1}
                                            style={{
                                                display: 'inline-block',
                                                padding: '8px 12px',
                                                margin: '4px',
                                                border: i + 1 === currentPage ? "2px solid #333" : "1px solid #ccc", // Highlight the current page
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handlePageClick(i + 1)}
                                        >
                                            {i + 1}
                                        </div>
                                    ))}




                                    <span className="pagination-icon"
                                        onClick={() => handlePageClick(currentPage < totalPages ? currentPage + 1 : totalPages)

                                        }><FaChevronRight size={14} /></span>
                                    <span className="pagination-icon"
                                        onClick={() => handlePageClick(totalPages)}><FaAngleDoubleRight /></span>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default HomePage;