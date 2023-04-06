import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import CartItemCard from '../components/Cart/CartItemCard';
import { Form, Row, Col, FormControl, Button, FormLabel } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { setBilling, setShipping, setPaying } from '../state/actions';
import routes from '../constants/routes.json';

const CheckoutPage = () => {
    const cart = useSelector((state) => state.cart);
    const billingDetails = useSelector((state) => state.address.billingAddress);
    const shipingDetails = useSelector((state) => state.address.shippingAddress);
    const payingDetails = useSelector((state) => state.address.payingAddress);

    const dispatch = useDispatch();
    const history = useHistory();
    const cartItems = cart.map((cartItem) => (
        <CartItemCard
            key={uuidv4()}
            id={cartItem.id}
            title={cartItem.title}
            price={cartItem.price}
            image={cartItem.image}
            quantity={cartItem.quantity}
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

    const [billingAddress, setBillingAddress] = useState({
        firstName: '',
        lastName: '',
        address: '',
        country: '',
        state: '',
    });
    const [billingAddressErrors, setBillingAddressErrors] = useState({
        firstName: "",
        lastName: "",
        address: "",
        country: "",
        state: "",
    });

    const [shippingAddress, setShippingAddress] = useState({
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
        cardNumber: "",
        expirationDate: "",
        securityCode: "",
    });
    const [cardErrors, setCardErrors] = useState({});

    const handleCardChange = (e) => {
        setCard({ ...card, [e.target.id]: e.target.value });
    };

    useEffect(() => {
        if (billingDetails || shipingDetails || payingDetails) {
            setBillingAddress({ ...billingDetails });
            setShippingAddress({ ...shipingDetails });
            setCard({ ...payingDetails });
        }
    }, [billingDetails, shipingDetails, payingDetails]);

    const handleAddressChange = (addressType, field, value) => {
        if (addressType === "billing") {
            setBillingAddress({ ...billingAddress, [field]: value });
        } else {
            setShippingAddress({ ...shippingAddress, [field]: value });
        }
    };

    const handleSameAddressChange = (e) => {
        setSameAddress(e.target.checked);
        if (e.target.checked) {
            setShippingAddress(billingAddress);
        } else {
            setShippingAddress({
                firstName: "",
                lastName: "",
                address: "",
                country: "",
                state: "",
            });
        }
    };

    const validateBillingAddress = () => {
        let isValid = true;
        const errors = {
            firstName: "",
            lastName: "",
            address: "",
            country: "",
            state: "",
        };

        if (!billingAddress.firstName) {
            isValid = false;
            errors.firstName = "First name is required";
        }
        if (!billingAddress.lastName) {
            isValid = false;
            errors.lastName = "Last name is required";
        }
        if (!billingAddress.address) {
            isValid = false;
            errors.address = "Address is required";
        }
        if (!billingAddress.country) {
            isValid = false;
            errors.country = "Country is required";
        }
        if (!billingAddress.state) {
            isValid = false;
            errors.state = "State is required";
        }


        setBillingAddressErrors(errors);
        return isValid;
    };

    const validateShippingAddress = () => {
        let isValid = true;
        const errors = {
            firstName: "",
            lastName: "",
            address: "",
            country: "",
            state: "",
        };

        if (!shippingAddress.firstName) {
            isValid = false;
            errors.firstName = "First name is required";
        }
        if (!shippingAddress.lastName) {
            isValid = false;
            errors.lastName = "Last name is required";
        }
        if (!shippingAddress.address) {
            isValid = false;
            errors.address = "Address is required";
        }
        if (!shippingAddress.country) {
            isValid = false;
            errors.country = "Country is required";
        }
        if (!shippingAddress.state) {
            isValid = false;
            errors.state = "State is required";
        }
        setShippingAddressErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            validateBillingAddress() &&
            validateShippingAddress() &&
            validateCard()
        ) {
            dispatch(setBilling(billingAddress));
            dispatch(setShipping(shippingAddress));
            dispatch(setPaying(card));
            history.push(routes.REVIEW);
        } else {
            console.error("Form validation failed");
        }
    };

    const validateCard = () => {
        let isValid = true;
        const errors = {
            cardNumber: "",
            expirationDate: "",
            securityCode: "",
        };

        if (!card.cardNumber) {
            isValid = false;
            errors.cardNumber = "Credit card number is required";
        } else if (!/^\d{16}$/.test(card.cardNumber)) {
            isValid = false;
            errors.cardNumber = "Credit card number must be 16 digits long";
        }

        if (!card.expirationDate) {
            isValid = false;
            errors.expirationDate = "Expiration date is required";
        } else if (!/^\d{2}\/\d{2}$/.test(card.expirationDate)) {
            isValid = false;
            errors.expirationDate = "Expiration date must be in the format MM/YY";
        } else {
            const inputDate = card.expirationDate.split("/");
            const inputYear = parseInt(inputDate[1], 10) + 2000;
            const inputMonth = parseInt(inputDate[0], 10);
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;

            if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
                isValid = false;
                errors.expirationDate = "Invalid expiration date";
            }
        }

        if (!card.securityCode) {
            isValid = false;
            errors.securityCode = "Security code is required";
        } else if (!/^\d{3}$/.test(card.securityCode)) {
            isValid = false;
            errors.securityCode = "Security code must be 3 digits long";
        }

        setCardErrors(errors)
        return isValid;
    };



    // Return block starts here:
    return (
        <>
            <div className="container">
                <div className="py-5 text-center">
                    <h1>Checkout Form</h1>
                </div>

                <div className="row">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">
                                <h2 className="mb-3">Order Summary</h2>
                            </span>
                            <span className="badge badge-secondary badge-pill">3</span>
                        </h4>
                        <ul class="list-group mb-3">
                            {
                                cartItems
                            }
                            <div className="mb-3" />
                            <li class="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                                <strong> {sumTotal()}</strong>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-8 order-md-1">
                        <h2 className="mb-3">Billing Address</h2>
                        <hr className="mb-3" />
                        <Form noValidate onSubmit={handleSubmit} >
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
                                            onChange={(e) =>
                                                handleAddressChange("billing", "firstName", e.target.value)
                                            }
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
                                            value={billingAddress.lastName}
                                            onChange={(e) =>
                                                handleAddressChange("billing", "lastName", e.target.value)
                                            }
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
                                    value={billingAddress.address}

                                    onChange={(e) =>
                                        handleAddressChange("billing", "address", e.target.value)
                                    }
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
                                            onChange={(e) =>
                                                handleAddressChange("billing", "country", e.target.value)
                                            }
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
                                            onChange={(e) =>
                                                handleAddressChange("billing", "state", e.target.value)
                                            }
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

                            <hr className="mb-3" />

                            <h2 className="mb-3">Shipping Address</h2>

                            <hr className="mb-3" />
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    id="same-address"
                                    label="Shipping address is the same as my billing address"
                                    onChange={handleSameAddressChange}
                                />
                            </Form.Group>
                            <div className="mb-3" />
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
                                            onChange={(e) =>
                                                handleAddressChange("shipping", "firstName", e.target.value)
                                            }
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
                                            onChange={(e) =>
                                                handleAddressChange("shipping", "lastName", e.target.value)
                                            }
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
                                    onChange={(e) =>
                                        handleAddressChange("shipping", "address", e.target.value)
                                    }
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
                                            value={shippingAddress.country}
                                            onChange={(e) =>
                                                handleAddressChange("shipping", "country", e.target.value)
                                            }
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
                                            size="lg"
                                            value={shippingAddress.state}
                                            onChange={(e) =>
                                                handleAddressChange("shipping", "state", e.target.value)
                                            }
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

                            <hr className="mb-3" />

                            <h2 className="mb-3">Payment</h2>

                            <hr className="mb-3" />
                            <Form.Group>
                                <Form.Label>Credit Card Number</Form.Label>
                                <FormControl
                                    required
                                    id="cardNumber"
                                    type="text"
                                    value={card.cardNumber}
                                    size="lg"
                                    onChange={handleCardChange}
                                />
                                <Form.Text className="text-danger">{cardErrors.cardNumber}</Form.Text>
                            </Form.Group>

                            <Row>
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label>Expiration Date</Form.Label>
                                        <FormControl
                                            required
                                            id="expirationDate"
                                            type="text"
                                            onChange={handleCardChange}
                                            value={card.expirationDate}
                                            size="lg"
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
                                            onChange={handleCardChange}
                                            value={card.securityCode}
                                        />
                                        <Form.Text className="text-danger">
                                            {cardErrors.securityCode}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <hr className="mb-4" />
                            <Button className="btn btn-primary btn-lg my-3" variant="primary" type="submit" block>
                                Continue to checkout
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckoutPage;