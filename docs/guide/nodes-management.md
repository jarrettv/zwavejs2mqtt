# Nodes Management

## Add or remove a node

![Add/Remove Dialog](../_images/add_remove_dialog.png)

To add or remove a node using the UI, go to Control Panel and click the ADD/REMOVE DEVICE button. A dialog will appear with options for `Inclusion`, `Secure Inclusion`, and `Exclusion`. Click start and then activate the ZWave pairing (usually a button) on your device. The dialog will remain on screen during the inclusion/exclusion process with a countdown. However, the countdown may finish early upon device detection. The dialog should show the node # upon success. 

When adding nodes, the interview process may take some time. We recommend you verify your secure devices were properly paired with security.

## Replace failed node

To replace a failed node from the UI you have to use the command `Replace Failed Node`, the controller will start inclusion mode and status will be `Waiting`, a popup will ask you if you want to start it in `Secure mode`. Now enable inclusion on your device to add it to the network by replacing the failed one.

## Remove a failed node

If a node is missing or marked as dead. There is a way to cleanup the controller by executing `Remove Failed Node`. This will forcibly delete the node from the controller.
It can only succeed if:

- Node has ben first marked as failed using `Has node failed`
- Marked as Dead by the controller

Alive and Sleeping nodes cannot be deleted.
