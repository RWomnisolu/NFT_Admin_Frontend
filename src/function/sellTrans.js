import { ethers } from "ethers";
import { LooksRare, ChainId, CollectionType, StrategyType } from "@looksrare/sdk-v2";


// const lr = new LooksRare(ChainId.MAINNET, provider, signer);

// const { maker, isCollectionApproved, isTransferManagerApproved } = await lr.createMakerAsk({
//   collection: "0x0000000000000000000000000000000000000000", // Collection address
//   collectionType: CollectionType.ERC721,
//   strategyId: StrategyType.standard,
//   subsetNonce: 0, // keep 0 if you don't know what it is used for
//   orderNonce: 0, // You need to retrieve this value from the API
//   endTime: Math.floor(Date.now() / 1000) + 86400, // If you use a timestamp in ms, the function will revert
//   price: ethers.utils.parseEther("1"), // Be careful to use a price in wei, this example is for 1 ETH
//   itemIds: [0], // Token id of the NFT(s) you want to sell, add several ids to create a bundle
//   amounts: [1], // Use it for listing multiple ERC-1155 (Optional, Default to [1])
//   startTime: Math.floor(Date.now() / 1000), // Use it to create an order that will be valid in the future (Optional, Default to now)
// });

// // Grant the TransferManager the right the transfer assets on behalf od the LooksRareProtocol
// if (!isTransferManagerApproved) {
//   const tx = await lr.grantTransferManagerApproval().call();
//   await tx.wait();
// }

// // Approve the collection items to be transferred by the TransferManager
// if (!isCollectionApproved) {
//   const tx = await lr.approveAllCollectionItems(maker.collection);
//   await tx.wait();
// }

// Sign your maker order
// const signature = await lr.signMakerOrder(maker);