import { isBefore } from 'date-fns';
import { Op } from 'sequelize';

import { Meetup, User, Subscription } from '../models';

import { Queue } from '../../lib';
import { SubscribeEmail } from '../../jobs';

class SubscriptionService {
  async list(user_id) {
    const userSubscriptions = await Subscription.findAll({
      where: {
        user_id,
      },
      attributes: ['id', 'user_id', 'meetup_id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: [
            'id',
            'title',
            'description',
            'location',
            'date',
            'user_id',
          ],
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
        },
      ],
      order: [['meetup', 'date']],
    });

    return { status: 200, data: userSubscriptions };
  }

  async create(subscription) {
    const meetup = await Meetup.findByPk(subscription.meetup_id, {
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    if (!meetup) {
      return { status: 404, data: { error: "Can't find the selected meetup" } };
    }

    // Check past meetup

    if (isBefore(meetup.date, new Date())) {
      return {
        status: 400,
        data: { error: "You cant't subscribe to past meetups" },
      };
    }

    // Check if user is the organizer

    if (meetup.user_id === subscription.user_id) {
      return {
        status: 401,
        data: { error: "You cant't subscribe to own meetups" },
      };
    }

    // Check if user already subscribed

    const alreadySubscribed = await Subscription.findOne({
      where: {
        user_id: subscription.user_id,
        meetup_id: subscription.meetup_id,
      },
    });

    if (alreadySubscribed) {
      return {
        status: 400,
        data: { error: 'You already subscribed to this meetup' },
      };
    }

    // Check if user subscribed to another meetup on the same time

    const checkTime = await Subscription.findOne({
      where: {
        user_id: subscription.user_id,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkTime) {
      return {
        status: 400,
        data: { error: 'You already subscribed to a meetup on the same time' },
      };
    }

    // Send email

    const userSubscribed = await User.findOne({
      where: {
        id: subscription.user_id,
      },
    });

    await Queue.add(SubscribeEmail.key, { meetup, userSubscribed });

    const newSubscription = await Subscription.create(subscription);

    return { status: 200, data: newSubscription };
  }
}

export default new SubscriptionService();
