import React from 'react'
import { Link } from 'react-router-dom';
import './Sliderproductcard.css'


const Sliderproductcard = (product) => {
    // console.log(p)
    let p = product.product
    let overalltax = 10 / 100;
    let overallcommission = 10 / 100;
    let extraforfun = 10 / 100;

    let mrp = parseInt(p.price)
    mrp = mrp + overalltax * mrp + overallcommission * mrp + extraforfun * mrp
    const saleprice = mrp - extraforfun * mrp


    return (
        <div>
            <div className='mini-product-container'>
                <div className='mini-img-container'> <img src={p.prodimage}></img></div>
                <div className='mini-product-details'>
                    <p className='mini-producttitle'>{p.producttitle}</p>
                    <div className='mini-price-container'>
                        <p className='mrp'>MRP: <p className='rate'>₹{mrp}</p></p>
                        <p className='saleprice'>Discount Price: <p className='rate'>₹{saleprice}</p></p>
                        <p className='yousave'>You Save: ₹{mrp - saleprice}</p>
                    </div>
                    <Link to={`/product/${p.producttype}/${p.id}`}><button className='showmore-btn'>More Details &gt;</button></Link>
                </div>
            </div >
        </div>
    )
}

export default Sliderproductcard