const express = require('express');
const { ethers } = require('ethers');
const app = express();
app.use(express.json());
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
const DOMAIN = { name: 'Exchange', version: '1', chainId: 1337, verifyingContract: '0x0000000000000000000000000000000000000000' };
app.get('/health', (req, res) => { res.json({ status: 'ok', address: wallet.address }); });
app.post('/sign', async (req, res) => { try { const sig = await wallet.signTypedData(DOMAIN, req.body.types, req.body.message); const { r, s, v } = ethers.Signature.from(sig); res.json({ signature: sig, r, s, v: Number(v) }); } catch (e) { res.status(500).json({ error: e.message }); } });
app.listen(process.env.PORT || 3000);
