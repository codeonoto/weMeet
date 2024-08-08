'use client';

import { useState } from 'react';
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModel from './MeetingModel';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from '@/components/ui/use-toast';

const MeetingTypeList = () => {
  const router = useRouter();

  const [meetingState, setmeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });

  const [callDetials, setCallDetials] = useState<Call>();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: 'Please Select A Date And Time',
        });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if (!call) throw new Error('Failed to Create Call');

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetials(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({
        title: 'Meeting Created Successfully',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Failed To Create Meeting',
      });
    }
  };

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 '>
      <HomeCard
        img='/icons/add-meeting.svg'
        title='New Meeting'
        description='Start an instant meeting'
        handleClick={() => setmeetingState('isInstantMeeting')}
        className='bg-gradient-to-r from-emerald-600 to-teal-400'
      />
      <HomeCard
        img='/icons/schedule.svg'
        title='Schedule Meeting'
        description='Plan your meeting'
        handleClick={() => setmeetingState('isScheduleMeeting')}
        className='bg-gradient-to-r from-cyan-500 to-blue-500'
      />
      <HomeCard
        img='/icons/recordings.svg'
        title='View Recordings'
        description='Check out your recordings'
        handleClick={() => router.push('/recordings')}
        className='bg-gradient-to-r from-red-600 to-orange-600'
      />
      <HomeCard
        img='/icons/join-meeting.svg'
        title='Join Meeting'
        description='via invitation link'
        handleClick={() => setmeetingState('isJoiningMeeting')}
        className='bg-gradient-to-r from-violet-800 to-blue-600'
      />

      <MeetingModel
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setmeetingState(undefined)}
        title='Start an Instant Meeting'
        className='text-center'
        buttonText='Start Meeting'
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
