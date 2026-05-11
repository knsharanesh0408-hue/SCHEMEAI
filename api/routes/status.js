import express from 'express';

const router = express.Router();

// Mock status data
const MOCK_STATUS = [
  { id: 1, scheme: 'PM-Kisan', status: 'Approved', date: '2026-04-15', history: [
    { status: 'Applied', date: '2026-04-01' },
    { status: 'Document Verification', date: '2026-04-10' },
    { status: 'Approved', date: '2026-04-15' }
  ]},
  { id: 2, scheme: 'Scholarship', status: 'Pending', date: '2026-05-01', history: [
    { status: 'Applied', date: '2026-05-01' }
  ]}
];

router.get('/:userId', (req, res) => {
  res.json({ success: true, applications: MOCK_STATUS });
});

export default router;
