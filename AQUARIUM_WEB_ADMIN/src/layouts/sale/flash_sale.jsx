import DataTable from "react-data-table-component"

export const FlashSale_Table = () => {
    return (
        <>
        <div className="-w-sale-product-list">
            <DataTable
                columns={[]}
                data={[]}
                fixedHeader
                fixedHeaderScrollHeight="100%"
                responsive
                highlightOnHover
                striped
                pagination={false}
            />
        </div>
        </>
    )
}