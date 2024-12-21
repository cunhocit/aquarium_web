/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { validVoucher, validVouchers } from "../../app/valid/validVoucher";
import { addVoucher, deleteVouchers, updateVouchers } from "../../app/api/voucherApi";
import { useVouchers } from "../../hooks/useVoucher";

export const VoucherLayout = () => {
    const [voucher, setVoucher] = useState({type_code: 'Giảm theo %', discount_percentage: '', quantity: '', end_date: ''});
    const {data, fetchData, isLoading} = useVouchers();
    const [vouchers, setVouchers] = useState([]);
    const [chooseVouchers, setChooseVouchers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        setVouchers(data);
    }, [data])

    if (isLoading) return <div>Đang tải...</div>

    const handleCreateVoucher = async () => {
        if (validVoucher(voucher)) {
            await addVoucher(voucher);
            fetchData();
        }
    }

    const handleUpdateVoucher = async () => {
        if (validVouchers(chooseVouchers)) {
            await updateVouchers(chooseVouchers);
            fetchData();
        }
    }

    const handleDeleteVoucher = async () => {
        if (validVouchers(chooseVouchers)) {
            await deleteVouchers(chooseVouchers);
            fetchData();
        }
    }

    const handleClick = (row) => {
        setChooseVouchers(prev => {
            const voucher_ = prev.some(p => p.id === row.id);
            if (voucher_) {
                return prev.filter(p => p.id !== row.id);
            }

            return [...prev, row];
        })
    }
    const handleSelectAll = () => {
        setSelectAll((prev) => {
            const newSelectAll = !prev;
            if (newSelectAll) {
                setChooseVouchers(vouchers);
            } else {
                setChooseVouchers([]);
            }
            return newSelectAll;
        });
    }

    const columns = [
        {
            name: <span style={{ fontSize: "0.9rem" }}> Chọn </span>,
            sortable: true,
            width: "100px",
            cell: (row) => (
                <div>
                    <input type="checkbox" name="" id="" 
                        checked={chooseVouchers.some(p => p.id === row.id)}
                        onChange={e => handleClick(row)}
                    />
                </div>
            )
        },
        {
            name: <span style={{ fontSize: "0.9rem" }}> Loại mã </span>,
            sortable: true,
            width: "200px",
            cell: row => (
                <div className="-w-voucher-column">
                    <select
                        value={row.type_code}
                        disabled={chooseVouchers.some(p => p.id === row.id) ? true : false}
                        onChange={(e) => {
                            const value = e.target.value;
                            setVouchers((prev) =>
                                prev.map((p) =>
                                    p.id === row.id ? { ...p, type_code: value } : p
                                )
                            );
                        }}
                    >
                        <option value="Giảm theo %">Giảm theo %</option>
                        <option value="Giảm theo số tiền">Giảm theo số tiền</option>
                    </select>
                </div>
            )
        },
        {
            name: <span style={{ fontSize: "0.9rem" }}> Mã giảm giá </span>,
            sortable: true,
            width: "200px",
            cell: row => <div><b>{row.voucherCode}</b></div>
        },
        {
            name: <span style={{ fontSize: "0.9rem" }}> Giảm giá (% hoặc đ) </span>,
            sortable: true,
            cell: (row) => (
                <div className="-w-voucher-column">
                    <input type="text" name="" id="" 
                        disabled={chooseVouchers.some(p => p.id === row.id) ? true : false}
                        value={row.discount_percentage || ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            setVouchers((prev) =>
                                prev.map((p) =>
                                    p.id === row.id ? { ...p, discount_percentage: value } : p
                                )
                            );
                        }}
                    />
                    {row.type_code === 'Giảm theo %' ? '%' : 'đ'}
                </div>
            ),
            width: "200px"
        },
        {
            name: <span style={{ fontSize: "0.9rem" }}> Số lượng </span>,
            sortable: true,
            cell: (row) => (
                <div className="-w-voucher-column">
                    <input type="text" value={row.quantity}
                        disabled={chooseVouchers.some(p => p.id === row.id) ? true : false}
                        onChange={(e) => {
                            const value = e.target.value;
                            setVouchers((prev) =>
                                prev.map((p) =>
                                    p.id === row.id ? { ...p, quantity: value } : p
                                )
                            );
                        }}
                    />
                </div>
            ),
            width: "200px"
        },
        {
            name: <span style={{ fontSize: "0.9rem" }}> Hết hạn </span>,
            sortable: true,
            cell: (row) => (
                <div className="-w-voucher-column">
                    <input type="date" name="" id="" value={row.end_date}
                        disabled={chooseVouchers.some(p => p.id === row.id) ? true : false}
                        onChange={(e) => {
                            const value = e.target.value;
                            setVouchers((prev) =>
                                prev.map((p) =>
                                    p.id === row.id ? { ...p, end_date: value } : p
                                )
                            );
                        }}
                    />
                </div>
            ),
            width: "200px"
        }
    ]

    return(
    <>
        <div className="wrap-voucher">
            <div className="-w-create-voucher">
                <div>
                    <h3>Tạo mã giảm giá</h3>
                    <label htmlFor="">
                        Loại mã
                        <select name="" id=""
                            value={voucher.type_code}
                            onChange={e => setVoucher({...voucher, type_code: e.target.value})}
                        >
                            <option value="Giảm theo %">Giảm theo %</option>
                            <option value="Giảm theo số tiền">Giảm theo số tiền</option>
                        </select>
                    </label>
                    <label htmlFor="">
                        Giảm giá
                        <input type="text" 
                            value={voucher.discount_percentage}
                            onChange={e => setVoucher({...voucher, discount_percentage: e.target.value})}
                        />
                    </label>
                    <label htmlFor="">
                        Số lượng
                        <input type="text" name="" id="" 
                            value={voucher.quantity}
                            onChange={e => setVoucher({...voucher, quantity: e.target.value})}
                        />
                    </label>
                    <label htmlFor="">
                        Hết hạn
                        <input type="date" name="" id="" 
                            value={voucher.end_date}
                            onChange={e => setVoucher({...voucher, end_date: e.target.value})}
                        />
                    </label>
                </div>

                <button onClick={handleCreateVoucher}>Tạo mã</button>
            </div>

            <div className="-w-voucher-list">
                <h3>Danh sách mã giảm giá</h3>

                <div className="-w-voucher-btn">
                    <label htmlFor="">
                        <input type="checkbox" name="" id="" 
                            checked={selectAll}
                            onChange={handleSelectAll}
                        />
                        Tất cả
                    </label>
                    <div>
                        <button onClick={handleDeleteVoucher}>Hủy giảm giá</button>
                        <button onClick={handleUpdateVoucher}>Cập nhật</button>
                    </div>
                </div>

                <div className="-w-voucher-list-child">
                    <DataTable
                        columns={columns}
                        data={vouchers}
                        fixedHeader
                        fixedHeaderScrollHeight="100%"
                        responsive
                        highlightOnHover
                        striped
                        pagination={false}
                    />
                </div>
            </div>
        </div> 
    </>
    )
}