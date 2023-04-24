import { isValidObjectId } from 'mongoose';
import { ErrorResponse } from '../utils/error-response';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { Event } from "../models/event-model";
import asyncHandler from 'express-async-handler';

export const fetchAllEvents = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
    const events = await Event.find();

    if(!events) {
      return next(new ErrorResponse(`No events found. Please try again`, StatusCodes.BAD_REQUEST));
    }

    return response.status(StatusCodes.OK).json({success: true, events});
})

export const fetchSingleEvent = async (request: any, response: any, next: NextFunction): Promise<any> => {
    const id = request.params.id;
    const event = await Event.findById(id);

    if(!event) {
        return next(new ErrorResponse(`No event with that ID : ${id} found on the server-side. Please try again later`, StatusCodes.BAD_REQUEST));
     }

    return response.status(StatusCodes.OK).json({success: true, event});

}

export const createNewEvent = async (request: any, response: any, next: NextFunction): Promise<any> => {
    const {name, summary, description, startAt, endsAt, eventStatus, format, isOnline, capacity, hasSeating, slotsAvailable, reservedSeating, salesStatus, venue, organiser, ticket, category } = request.body;

    if(!name || !summary || !description || !startAt || !endsAt || !eventStatus || !format || !isOnline || !capacity || !hasSeating || !slotsAvailable || !reservedSeating || !salesStatus || !venue || !organiser || !ticket || !category) {
        return next(new ErrorResponse(`One of the event fields are missing. Please try again`, StatusCodes.BAD_REQUEST));
     }

     const event = await Event.create({name, summary, description, startAt, endsAt, eventStatus, format, isOnline, capacity, hasSeating, slotsAvailable, reservedSeating, salesStatus, venue, organiser, ticket, category});
    await event.save();

    return response.status(StatusCodes.CREATED).json({success: true, event});

}    

export const editEventByID = async (request: any, response: any, next: NextFunction): Promise<any> => {

        const id = request.params.id;
        let event = await Event.findById(id);

        if(!isValidObjectId(id)) {
            return next(new ErrorResponse(`Event ID is invalid. Please check again`, StatusCodes.BAD_REQUEST));
        }

        // Check if the event status is not started already or canceled
        if(event.eventStatus === 'started') {
            return next(new ErrorResponse(`You cannot modify the event ${id} - as it has already started`, StatusCodes.BAD_REQUEST));
        }

        // Check to see if the event has canceled
        if(event.eventStatus === 'canceled') {
            return next(new ErrorResponse(`You cannot modify the event ${id} - as it has already been canceled`, StatusCodes.BAD_REQUEST));
        }

        if(!event) {
            return next(new ErrorResponse(`No event with that ID : ${id} found on the server-side. Please try again later`, StatusCodes.BAD_REQUEST));
        }

        event = await Event.findByIdAndUpdate(id, request.body, {new: true, runValidators: true});
        return response.status(StatusCodes.OK).json({success: true, event});
    }
    

export const deleteEvents = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {

    if(request.method === 'DELETE') {
        await Event.deleteMany();
        return response.status(StatusCodes.NO_CONTENT).json({success: true, message: "Events Deleted"})
    }
    
})

export const deleteEventByID = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
     const id = request.params.id;
     let event = await Event.findById(id);

     if(!event) {
        return next(new ErrorResponse(`Could not find that event ID`, StatusCodes.BAD_REQUEST));
     }

     event = await Event.findByIdAndUpdate(id, request.body, {new: true, runValidators: true});
     await event.save();
     return response.status(StatusCodes.OK).json({success: true, message: `Event with ID : ${id} - updated successfully`});
})

export const uploadEventPhoto = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
    const file = request.files.file as any
    const id = request.params.id;

    if(!isValidObjectId(id)) {
      return next(new ErrorResponse(`The product ID is in the wrong format. Please check your ID again`, StatusCodes.BAD_REQUEST));
    }

    if(!file) {
        return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "Please upload a valid file"});
    }

    // Validate the file size
    if(file.size > process.env.PRODUCTS_SERVICE_MAX_FILE_UPLOAD_SIZE) {
        return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "File size is too large, please upload again"});
    }

    const fileName = `event_${request.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.PRODUCTS_SERVICE_FILE_UPLOAD_PATH}/${fileName}`, async (error) => {

    if (error) {
      console.error(error);
      return next(new ErrorResponse('Problem with file upload', StatusCodes.INTERNAL_SERVER_ERROR));
    }

    await Event.findByIdAndUpdate(id, { image: `/images/${fileName}` });
    return response.status(StatusCodes.OK).json({success: true, message: "Event Image Uploaded"});

})})

export const editEventStartTime = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
  const fieldsToUpdate = {newStartsAt: request.body.startsAt, newEndsAt: request.body.newEndsAt};
  const id = request.params.id;
  let event = await Event.findById(id);
  
  if(!isValidObjectId(id)) {
     return next(new ErrorResponse(`Event ID is not valid`, StatusCodes.BAD_REQUEST));
  }

  if(!event) {
     return next(new ErrorResponse(`No event found with that ID`, StatusCodes.BAD_REQUEST));
  }

  event = await Event.findByIdAndUpdate(id, fieldsToUpdate, {new: true, runValidators: true})
  await event.save();

  event.startAt = request.body.startsAt;
  event.endsAt = request.body.endsAt;

  return response.status(StatusCodes.OK).json({success: true, message: "Event Start / End Dates Modified", event});
})

export const likeEvent = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
    const {eventId} = request.params.eventId;
    const currentEvent = await Event.findById(eventId);
    const userId = request.user._id;

    if(!currentEvent) {
        return next(new ErrorResponse(`Event with that ID not found`, StatusCodes.BAD_REQUEST));
    }

    const eventAlreadyLiked = currentEvent.likes.includes(userId);

    if(eventAlreadyLiked) {
        return next(new ErrorResponse(`The event has already been liked by user : ${userId}`, StatusCodes.BAD_REQUEST));
    }

    if(currentEvent.eventStatus === 'canceled') {
        return next(new ErrorResponse(`Cannot unlike a canceled event`, StatusCodes.BAD_REQUEST));
    }

    currentEvent.likes.push(userId);
    await currentEvent.save();
    return response.status(StatusCodes.OK).json({success: true, message: "Event Liked", currentEvent});
})

export const unlikeEvent = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
    const {eventId} = request.params;
    const user = request.user._id;
    const currentEvent = await Event.findById(eventId);

    if(!currentEvent) {
        return next(new ErrorResponse(`Cannot find the event ID : ${currentEvent} to unlike`, StatusCodes.BAD_REQUEST));
    }

    if(currentEvent.eventStatus === 'canceled') {
        return next(new ErrorResponse(`Cannot unlike a canceled event`, StatusCodes.BAD_REQUEST));
    }

    const alreadyLiked = currentEvent.likes.includes(user);

    if(alreadyLiked) {
        return response.status(StatusCodes.BAD_REQUEST).json({success: false, message: "You have not liked this event"})
    }

    await currentEvent.save();
    return response.status(StatusCodes.OK).json({success: true, message: "Event Unliked"})
})