require('dotenv').config();
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import mongoose from 'mongoose';
import {app} from "../app";

const TICKETS_SERVICE_DB_URI = process.env.TICKETS_SERVICE_DB_URI || ""

beforeAll(async () => {
    // Before starting the unit tests
    return await mongoose.connect(TICKETS_SERVICE_DB_URI);
})

describe("Fetch All Tickets - Unit Test Suite", () => {

    it("Fetch All Tickets - Unit Test I", async () => {
        const response = await request(app).get(`/api/v1/tickets`).send();
        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.body).not.toBe(null);
    })


})

describe("Fetch Single Ticket - Unit Test Suite", () => {

    it("Fetch Single Ticket By ID - Valid ID", async () => {
        
    })

    it("Fetch Single Ticket By ID - Missing ID", async () => {

    })

    it("Fetch Single Ticket By ID - Malformed ID", async () => {

    })

})

describe("Create Event Ticket - Unit Test Suite",  () => {
    it("Create New Ticket - Valid Details", async () => {
        const ticketBodyData = [{name: "Musselburgh Horse Racing - Basic Ticket", ticketClass: "basic", currentStock: 3}]
    })

    it("Create New Ticket - Missing Details", async () => {
    
    })

    it("Create New Ticket - Event Name < 10 characters length", async () => {

    })

    it("Create New Ticket - Event Name > 100 characters length", async () => {

    })

    it("Create New Ticket - Missing Issuer ID", async () => {

    })

    it("Create New Ticket - Missing Event ID", async () => {

    })

})

describe("Edit Event Ticket Test Suite", () => {
    it("Edit Ticket Details - Valid ID", async () => {

    })

    it("Edit Ticket Details - Missing Ticket Class & Current Stock", async () => {
        
    })


})

afterAll((done) => {
    mongoose.connection.close();
    done();
})