import express from 'express';
import Group from '../models/groupModel.js';
import User from '../models/user.js';

export const createGroup = async (req,res) => {
    try {
        const {name} = req.body;
        const newGroup = new Group({
            name,
            creator: req.user._id,
            members: [req.user._id]
        });

        await newGroup.save();
        res.status(200).json({message:"group created successfully"})
    } catch (error) {
        console.log('error in creating group', error.message);
        res.status(400).json({error: 'error in group creation'});
    }
}

export const addMembers = async (req,res) => {
    try {
        const {userId} = req.body;
        const user = await User.findById(userId);

        if(!user){
            console.log('this user does not exist');
            res.status(400).json({message: 'user does not exist'});
        }
        const group = await Group.findById(req.params.groupId);
        if(!group){
            res.status(400).json({message: 'group not found'})
        }
        if(group.members.includes(userId)){
            res.status(400).json({message: 'user is already part of this group'})
        }
        group.members.push(userId);
        await group.save();
        res.status(200).json({message:'user added to the group'})

    } catch (error) {
        console.log('user not added',error.message);
        res.status(400).json({message: 'error in adding user to group'})
    }
}


export const deleteGroup = async (req,res) =>{
    try {
        const group = await Group.findById(req.params.groupId);
        if(!group){
            res.status(400).json({message:"no such group exists"})
        }
        console.log('Group Creator:', group.creator);
    console.log('Authenticated User:', req.user._id);
        if(group.creator.toString() !== req.user.id.toString()){
            return res.status(400).json({message: 'Only admin can delete this group'})
        }
        await group.deleteOne();
        res.status(200).json({message:'group deleted successfully'});
    } catch (error) {
        console.log(`can't delete this group`,error.message);
        res.status(400).json({message:'group not deleted'})
    }
}

export const searchGroup = async (req,res) => {
    try {
        const {query} = req.query;
        const groups = await Group.find({ name: { $regex: req.query.toString(), $options: 'i' } });
        res.status(200).json({message: 'group found'})
    } catch (error) {
        console.log('group not found',error.message);
        res.status(400).json({message:'no such group exists'})
    }
}