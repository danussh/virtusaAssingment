import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import CartItemCard from '../components/Cart/CartItemCard';
import { Form, Row, Col, FormControl, Button, FormLabel } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import routes from '../constants/routes.json';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
    const history = useHistory();

    const close = () => {
        history.push('/shopping-cart')
        window.location.reload();
    }
    return (
        <Modal
            {...props}
            size="mg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton ={false}>
                <Modal.Title id="contained-modal-title-vcenter">
                   <h1>Order Status</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="green" class="bi bi-check-circle" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 15.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm3.854-9.646a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7 9.293l3.646-3.647a.5.5 0 0 1 .708 0z" />
                    </svg>
                    <h3 className="mt-3">Order Placed Successfully</h3>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close} className='btn btn-lg'>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

const ReviewPage = () => {
    const cart = useSelector((state) => state.cart);
    const history = useHistory();
    const billadd = useSelector((state) => state.address.billingAddress);
    const shipadd = useSelector((state) => state.address.shippingAddress);
    const payadd = useSelector((state) => state.address.payingAddress);
    const [modalShow, setModalShow] = React.useState(false);

    const cartItems = cart.map((cartItem) => (
        <CartItemCard
            key={uuidv4()}
            id={cartItem.id}
            title={cartItem.title}
            price={cartItem.price}
            image={cartItem.image}
            quantity={cartItem.quantity}
            donNotShow={true}
        ></CartItemCard>
    ));

    const sumTotal = () => {
        return cart
            .reduce(
                (total, cartItem) => total + cartItem.price * cartItem.quantity,
                0
            )
            .toFixed(2);
    };

    const handleBack = () => {
        history.push(routes.CHECKOUT);
    }

    const [billingAddress, setBillingAddress] = useState({
        firstName: billadd?.firstName || '',
        lastName: billadd?.lastName || '',
        address: billadd?.address || '',
        country: billadd?.country || '',
        state: billadd?.state || '',
    });

    const [shippingAddress, setShippingAddress] = useState({
        firstName: shipadd?.firstName || '',
        lastName: shipadd?.lastName || '',
        address: shipadd?.address || '',
        country: shipadd?.country || '',
        state: shipadd?.state || '',
    });
    const [billingAddressErrors, setBillingAddressErrors] = useState({
        firstName: "",
        lastName: "",
        address: "",
        country: "",
        state: "",
    });

    const [shippingAddressErrors, setShippingAddressErrors] = useState({
        firstName: "",
        lastName: "",
        address: "",
        country: "",
        state: "",
    });

    const [sameAddress, setSameAddress] = useState(false);

    const [card, setCard] = useState({
        cardNumber: payadd?.cardNumber || '',
        expirationDate: payadd?.expirationDate || '',
        securityCode: payadd?.securityCode || '',
    });
    const [cardErrors, setCardErrors] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            billingAddress,
            shippingAddress,
            card,
            cart,
        };
        console.log(formData);
        setModalShow(true)
        // alert(' Form Submitted SucessFully, Check The logs For FormData');

    };


    // Return block starts here:
    return (
        <>
            <div className="container">
                <div className="py-5 text-center">
                    <h1>Review Form</h1>
                </div>
                <div className="row">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">
                                <h3 className="mb-3">Order Summary</h3>
                            </span>
                            <span className="badge badge-secondary badge-pill">3</span>
                        </h4>
                        <ul className="list-group mb-3 mr-2">
                            {cartItems}
                            <li className="list-group-item d-flex justify-content-between mt-3">
                                <span>Total (USD)</span>
                                <strong> {sumTotal()}</strong>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-8 order-md-1">
                        <h2 className="mb-3">Billing address</h2>
                        <hr className="mb-3" />
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>First Name</Form.Label>
                                        <FormControl
                                            required
                                            size="lg"
                                            id="billingFirstName"
                                            type="text"
                                            value={billingAddress.firstName}
                                            disabled
                                        />
                                        <Form.Text className="text-danger">
                                            {billingAddressErrors.firstName}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Last Name</Form.Label>
                                        <FormControl
                                            required
                                            id="billingLastName"
                                            type="text"
                                            size="lg"
                                            disabled
                                            value={billingAddress.lastName}
                                        />
                                        <Form.Text className="text-danger">
                                            {billingAddressErrors.lastName}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="mb-3" />
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <FormControl
                                    required
                                    id="billingAddress"
                                    size="lg"
                                    type="text"
                                    disabled
                                    value={billingAddress.address}
                                />
                                <Form.Text className="text-danger">
                                    {billingAddressErrors.address}
                                </Form.Text>
                            </Form.Group>
                            <div className="mb-3" />
                            <Row>
                                <Col md={5}>
                                    <Form.Group>
                                        <Form.Label>Country</Form.Label>
                                        <FormControl
                                            required
                                            as="select"
                                            id="billingCountry"
                                            size="lg"
                                            value={billingAddress.country}
                                            disabled
                                        >
                                            <option value="">Select Country</option>
                                            <option value="USA">USA</option>
                                            <option value="Canada">Canada</option>
                                        </FormControl>
                                        <Form.Text className="text-danger">
                                            {billingAddressErrors.country}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>State</Form.Label>
                                        <FormControl
                                            required
                                            as="select"
                                            id="billingState"
                                            size="lg"
                                            value={billingAddress.state}
                                            disabled
                                        >
                                            <option value="">Select State</option>
                                            <option value="California">California</option>
                                            <option value="New York">New York</option>
                                        </FormControl>
                                        <Form.Text className="text-danger">
                                            {billingAddressErrors.state}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="mb-3" />
                            <hr className="mb-3" />

                            <h2 className="mb-3">Shipping Address</h2>

                            <hr className="mb-3" />
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>First Name</Form.Label>
                                        <FormControl
                                            required
                                            id="shippingFirstName"
                                            type="text"
                                            size="lg"
                                            value={shippingAddress.firstName}
                                            disabled
                                        />
                                        <Form.Text className="text-danger">
                                            {shippingAddressErrors.firstName}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Last Name</Form.Label>
                                        <FormControl
                                            required
                                            id="shippingLastName"
                                            type="text"
                                            size="lg"
                                            value={shippingAddress.lastName}
                                            disabled
                                        />
                                        <Form.Text className="text-danger">
                                            {shippingAddressErrors.lastName}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="mb-3" />
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <FormControl
                                    required
                                    id="shippingAddress"
                                    type="text"
                                    size="lg"
                                    value={shippingAddress.address}
                                    disabled
                                />
                                <Form.Text className="text-danger">
                                    {shippingAddressErrors.address}
                                </Form.Text>
                            </Form.Group>
                            <div className="mb-3" />
                            <Row>
                                <Col md={5}>
                                    <Form.Group>
                                        <Form.Label>Country</Form.Label>
                                        <FormControl
                                            required
                                            as="select"
                                            id="shippingCountry"
                                            size="lg"
                                            disabled
                                            value={shippingAddress.country}
                                        >
                                            <option value="">Select Country</option>
                                            <option value="USA">USA</option>
                                            <option value="Canada">Canada</option>
                                        </FormControl>
                                        <Form.Text className="text-danger">
                                            {shippingAddressErrors.country}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>State</Form.Label>
                                        <FormControl
                                            required
                                            as="select"
                                            id="shippingState"
                                            disabled
                                            size="lg"
                                            value={shippingAddress.state}
                                        >
                                            <option value="">Select State</option>
                                            <option value="California">California</option>
                                            <option value="New York">New York</option>
                                        </FormControl>
                                        <Form.Text className="text-danger">
                                            {shippingAddressErrors.state}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="mb-3" />
                            <hr className="mb-3" />

                            <h2 className="mb-3">Payment</h2>

                            <hr className="mb-3" />
                            <Form.Group>
                                <Form.Label>Credit Card Number</Form.Label>
                                <FormControl
                                    required
                                    id="cardNumber"
                                    type="text"
                                    disabled
                                    size="lg"
                                    value={card.cardNumber}
                                />
                                <Form.Text className="text-danger">{cardErrors.cardNumber}</Form.Text>
                            </Form.Group>
                            <div className="mb-3" />
                            <Row>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Expiration Date</Form.Label>
                                        <FormControl
                                            required
                                            id="expirationDate"
                                            type="text"
                                            size="lg"
                                            disabled
                                            value={card.expirationDate}
                                        />
                                        <Form.Text className="text-danger">
                                            {cardErrors.expirationDate}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Security Code</Form.Label>
                                        <FormControl
                                            required
                                            id="securityCode"
                                            type="text"
                                            size="lg"
                                            value={card.securityCode}
                                            disabled
                                        />
                                        <Form.Text className="text-danger">
                                            {cardErrors.securityCode}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <hr className="mb-4" />
                            <Button
                                className="btn btn-success btn-lg my-3 mr-3" // Change the ml-5 to mr-3 or another value that works for your design
                                variant="success"
                                type="submit"
                                block
                                style={{ marginRight: '10px' }}
                                disabled={cartItems.length > 0 ? false : true}
                            >
                                Continue To Pay
                            </Button>
                            <Button className="btn btn-primary btn-lg my-3" variant="primary" type="button" block onClick={handleBack}>
                                Back
                            </Button>

                        </Form>
                    </div>
                </div>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => { setModalShow(false) }}
            />
        </>
    );
};

export default ReviewPage;