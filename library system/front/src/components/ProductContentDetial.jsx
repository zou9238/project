export const ProductContentDetial = (props) => {

    return (
        <div  {...props.product.id}>
            <p><strong>ProductContentDetial</strong> </p>
            {props.product.name}
        </div>
    );
}
