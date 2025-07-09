---
id: "0c8e"
title: "Experiment: Accurate Modelling in VR"
slug: "experiment-accurate-modelling-in-vr"
seo_title: ""
excerpt: "Everyone in the VR industry says there are no rules. “Run lots of small experiments and see what works”, they say. “Don’t get attached”…"
image: "0yBBWe2xYs2-ZVqPW.png"
publish_date: "2017-03-23"
featured: true
published: true
---

Everyone in the VR industry says there are no rules. “Run lots of small experiments and see what works”, they say. “Don’t get attached”, they say. So I started a “small” experiment, and ended up spending so many late night hours that I feel like I’m building a product, not an experiment. Yes, I know it’s wrong, but it’s the excitement of learning something new and so magical that makes me feel like I drank a gallon of Redbull, and I can keep going for months.

This experiment is about accurate modeling in VR. I don’t mean mesh editing, but blocks layout. If it was a product, I would imagine that you can use it to prototype an environment, or a toy, or a furniture, and then replace the blocks with detailed meshes. But it’s not a product — it’s an experiment. No attachments.

Here it is:

### Transcript:

I’m an interaction designer, experimenting interaction in VR.

I am fascinated specifically about creation tools, and tried many, if not all of the currently available ones. There are amazing tools out there if you’re looking to create free form art in VR, and not as many apps that allow you to work accurately. Obviously, accurate modeling has many real world uses, such as industrial design, interior design, and even for designing virtual interfaces and environments.

So I started this experiment I am trying to learn two things:

First — I’m trying to find a **balance** between the natural, immersive free form transformation, and the accurate but constrained transformation.

And second — I want to see how far I can get with **minimum artificial UI** elements. Not to say that UI elements are totally forbidden, but striving to minimize them is a good practice, if you don’t want to end up with too many of them.

Let me show you what I got so far.

So the first thing you’ll notice is that when I grab and move an object — it does not rotate. I’ll get to rotation in a minute and describe the reasoning for this decision, but while the **rotation is locked**, moving objects around is not restricted in any way.

The **floor** is the only limitation. I started without a floor, but I find that it feels more comfortable to have a floor to stand on. Also, when designing environments it’s good to know where the floor is, and putting items on the floor would be a common scenario.

By the way, as much as I love room scale VR, I believe that professional tools should **support sitting down** when possible, so I created this **fishing rod** mechanism that allows me to bring objects closer or further away, using the thumbstick while I drag. Kind of like having a long flexible arm that can reach anywhere.

Now, about accurate transformation: The first aspect of accuracy that is commonly required, is the ability to move an object while **retaining one or two axes**. For example — moving an object higher on the Y axis while keeping its position on the X and Z axes. In 3D software you achieve that by pulling a Y axis handle. But as I said, one of my goals is to minimize UI elements, and these transformation handles are no different.

So I borrowed the concept of **snapping** that I know from 2D design software. This approach enables me to drag an object freely, but when I want to move it higher, for example, it snaps to the origin Y axis.

I can also retain one axes, and move the object along a plane, if, for example, I want to move the object freely while retaining its height.

You can now see the second aspect of the accurate work, and that’s [measurements](http://vrux.design/text-labels-in-vr/).

Now, at first, I set this snapping to be always active, and it was a bit annoying — it was snapping when I didn’t mean it to. I’m still looking into the right balance, or a way to understand when a user intends to use this snapping and when to turn it off. But for now, I use the left hand index trigger as a “**precise mode**” button. I don’t need to have my left hand in view in order to use it. It feels like the shift key on a classic keyboard.

Another type of snapping that I find necessary is **alignment to a different object.**

Let’s say I want to put this small red cube exactly at the corner of the blue box. To do that, while I drag the red cube, I mark the blue box with my other hand as a reference object. That’s the yellow highlight. Now the red cube snaps to the closest side, or center, of the blue box.

At first I used a concept I love in Sketchup, and defined a reference by dragging one object into another object , and holding it there for two seconds. This long collision would trigger the reference without the need for another click, or another hand for that matter. But when you place a dragged object adjacent to another object, that doesn’t always mean you want them to align to each other. One solution would be to to check the depth of the intersection to avoid unintended referencing.

But for the proof of concept I use another controller trigger to mark an object as reference. Once again — I am looking for ways to minimize the use of UI, and controller buttons are part of it, by trying to understanding the user’s intent.

As you can see, it also shows me the distance between the dragged object and its reference.

I can utilize **both snapping types**. I can drag this cube along its X axis, and align it to this other cube at the same time.

I can also center object to each other using this reference snapping.

Now let’s go back to **rotation**

I am still using handles in this experiment to distinguish between move and rotate. My plan is to replace them, again, with gestures that show intent. So, if the user twists his wrist more than 20 degrees while holding an object, without moving it around too much, I can interpret that as an intent to rotate.

I admit that I haven’t started with **scaling** objects, so handling all three types of transformations just by understanding an intent is… quite challenging.

As I mentioned earlier, rotation is a mess. If I rotate an object freely, straightening it back accurately is almost impossible. The ‘precise’ mode comes in handy again. When I click that ‘shift’ trigger, the object’s rotation snaps to segments of 15 degrees. This allows accurate common rotations, such as 30, 45, 60, or 90 degrees.

It’s important to note that these snapping segments are relative to the object’s **original** rotation, so if I accidentally rotated an object freely, I can always fix it with the precise mode.

I’m actually even considering to limit the rotation to these 15 degrees segments, regardless of the precise mode. I believe that it still leaves enough options for most accurate modeling use cases.

Unfortunately, I still couldn’t figure out how to show the current rotation value, trivial as it sounds.

**This is it, so far.**

I will keep experimenting and will probably update this video.

If you have any thoughts about this concept of accurate modeling with minimal UI elements — please comment.

Thank you.