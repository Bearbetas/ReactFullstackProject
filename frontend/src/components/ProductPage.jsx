import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import HeroStrip from './HeroStripImage';
import { CartContext } from './CartContext';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null); // Ändra initial värde till null
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        console.log(`Fetching product with id: ${id}`);

        fetch(`/productpage/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => {
                console.error('There was an error fetching the product!', error);
            });
    }, [id]);

    const handleAddToCart = () => {
        const userId = null; // Sätt userId till null om användaren inte är inloggad
        const productId = product.ID; // OBS: Se till att produkt-ID är korrekt, ändra detta vid behov
        const quantity = 1; // Exempelvärde, kan justeras baserat på användarens val

        fetch(`/cart/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, productId, quantity }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add product to cart');
            }
            return response.json();
        })
        .then(data => {
            console.log('Product added to cart:', data);
            // Uppdatera frontend som nödvändigt
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    if (!product) return <div>Loading...</div>;

    return (
        <>
            <HeroStrip />
            <Row xs={1} md={2} className="g-4 justify-content-center">
                <Col key={product.ID} className="text-center">
                    <img src={product.img} alt="en bild på en fruktkorg" className="img-fluid" />
                </Col>
                <Col key={product.ID} className="d-flex align-items-center justify-content-center">
                    <div className="p-1 custom-margin" style={{ margin: '2vh' }}>
                        <Card style={{ backgroundColor: product.hex }} className="w-100 h-100 m-10">
                            <Card.Body className="d-flex flex-column justify-content-center text-center">
                                <Card.Title className="display-4">{product.titel}</Card.Title>
                                <Card.Text className="fs-5">{product.info}</Card.Text>
                                <Card.Text className="fs-5">{product.description}</Card.Text>
                                <Card.Text className="display-4">{product.price}kr</Card.Text>
                                <Button variant="success" size="lg" onClick={handleAddToCart} className="mx-auto w-50" style={{ margin: '1vh' }}>
                                    Lägg i varukorg
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default ProductPage;




/* import { useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap'
//import { Link } from 'react-router-dom'
import HeroStrip from './HeroStripImage'
import { CartContext } from './CartContext';

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState([])
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    console.log(`Fetching product with id: ${id}`)

    fetch(`/productpage/${id}`)
      .then(response => response.json())
      .then((data) => setProduct(data))
      .catch(error => {
        console.error('There was an error fetching the product!', error)
      })
  }, [id])

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <>
    < HeroStrip />
    <Row xs={1} md={2} className="g-4 justify-content-center">
    <Col key={product.id} className="text-center">
      <img src={product.img} alt="en bild på en fruktkorg" className="img-fluid" />
    </Col>
    <Col key={product.id} className="d-flex align-items-center justify-content-center">
      <div className="p-1 custom-margin"style={{ margin: '2vh'}}>
        <Card style={{ backgroundColor: product.hex }} className="w-100 h-100 m-10">
          <Card.Body className="d-flex flex-column justify-content-center text-center">
            <Card.Title className="display-4">{product.titel}</Card.Title>
            <Card.Text className="fs-5">{product.info}</Card.Text>
            <Card.Text className="fs-5">{product.description}</Card.Text>
            <Card.Text className="display-4">{product.price}kr</Card.Text>
            <Button variant="success" size="lg" onClick={handleAddToCart} className="mx-auto w-50" style={{margin:'1vh'}}>Lägg i varukorg</Button>

          </Card.Body>
        </Card>
      </div>
    </Col>
</Row>

    </>
)
}

export default ProductPage */

{/*  <Button
              id={product.id}
              variant="success"
              size="lg"
              as={Link}
              to="/cart"
              className="mx-auto w-50"
              style={{margin:'1vh'}}>
              Lägg i varukorg
            </Button> */}
