import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useMutation, useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { api } from '../../convex/_generated/api';
import { Button } from './ui/button';
import toast from 'react-hot-toast';

function EndCallButton(){
    const call = useCall();
    const router = useRouter();
    const {useLocalParticipant} = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    const updateInterviewerStatus = useMutation(api.interviews.updateInterviewStatus);
    const interview =useQuery(api.interviews.getInterviewByStreamCallId,{
        streamCallId:call?.id || "",

    })
    if(!call || !interview) return null

    const isMeetingOwner = localParticipant?.userId ===call.state.createdBy?.id

    if(!isMeetingOwner) return null

    const endCall = async()=>{
        try {
            await call.endCall();
            await updateInterviewerStatus({
                id:interview._id,
                status:"completed"
            })
            router.push("/")
            toast.success("Meeting ended for every one")
        } catch (error) {
            console.log(error);
            toast.error("Failed to end meeting")
            
        }
    }
  return <Button  variant={"destructive"} onClick={endCall} >

  </Button>
}

export default EndCallButton