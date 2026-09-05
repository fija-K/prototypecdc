import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GroupPurpose, StudentStatus, Department } from '../../types';
import { X, UserPlus, FolderPlus, LifeBuoy, Check } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssignMentorModal: React.FC<ModalProps & { studentId?: string; groupId?: string }> = ({
  isOpen, onClose, studentId, groupId
}) => {
  const { students, groups, mentors, assignStudentToMentor } = useApp();
  const [selectedMentorId, setSelectedMentorId] = useState<string>(mentors[0]?.id || '');
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const targetStudent = students.find(s => s.id === studentId);
  const targetGroup = groups.find(g => g.id === groupId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId && selectedMentorId) {
      assignStudentToMentor(studentId, selectedMentorId);
    }
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-md p-6 space-y-4 shadow-2xl text-slate-800 font-sans">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <UserPlus className="w-4 h-4" />
            <span>Assign CDC Mentor</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        {successMsg ? (
          <div className="py-8 text-center space-y-2 text-emerald-600">
            <Check className="w-10 h-10 mx-auto animate-bounce" />
            <p className="font-bold text-sm">Mentor Successfully Assigned!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Target Entity</label>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium">
                {targetStudent ? (
                  <div>
                    <span className="font-bold text-blue-600">{targetStudent.name}</span> ({targetStudent.rollNo} - {targetStudent.dept})
                  </div>
                ) : targetGroup ? (
                  <div>
                    Group: <span className="font-bold text-blue-600">{targetGroup.name}</span> ({targetGroup.studentIds.length} students)
                  </div>
                ) : (
                  <span>Selected Student Population</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Select Mentor</label>
              <select
                value={selectedMentorId}
                onChange={e => setSelectedMentorId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-600 font-medium"
              >
                {mentors.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.dept} - {m.assignedStudentIds.length}/{m.maxCapacity} students)
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs"
              >
                Confirm Assignment
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export const CreateGroupModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { createGroup, mentors } = useApp();
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState<GroupPurpose>('Placement');
  const [type, setType] = useState<'Static' | 'Dynamic'>('Static');
  const [primaryMentorId, setPrimaryMentorId] = useState(mentors[0]?.id || 'm1');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    createGroup({
      name,
      purpose,
      type,
      studentIds: ['s1', 's2'],
      avgScore: 780,
      growthRate: 10.5,
      activePercent: 90,
      attentionCount: 0,
      owner: 'CDC Placement Cell',
      mentorIds: [primaryMentorId],
      primaryMentorId
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
            <FolderPlus className="w-4 h-4" />
            <span>Create New Student Group</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1">Group Name</label>
            <input
              type="text"
              placeholder="e.g. Amazon AWS SDE Candidates 2025"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Group Purpose</label>
              <select
                value={purpose}
                onChange={e => setPurpose(e.target.value as GroupPurpose)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="Placement">Placement</option>
                <option value="Training">Training</option>
                <option value="Mentoring">Mentoring</option>
                <option value="Intervention">Intervention</option>
                <option value="Talent Discovery">Talent Discovery</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Group Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as 'Static' | 'Dynamic')}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="Static font-semibold">Static Population</option>
                <option value="Dynamic">Dynamic (Rule Based)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Assign Primary Mentor</label>
            <select
              value={primaryMentorId}
              onChange={e => setPrimaryMentorId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
            >
              {mentors.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.dept})</option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-950"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const CreateInterventionModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { createIntervention, mentors, groups } = useApp();
  const [name, setName] = useState('');
  const [type, setType] = useState<'Skill' | 'Activity' | 'Development' | 'Competitive Programming' | 'Training'>('Skill');
  const [problemIdentified, setProblemIdentified] = useState('');
  const [targetDescription, setTargetDescription] = useState('');
  const [mentorId, setMentorId] = useState(mentors[0]?.id || 'm1');
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0]?.id || 'g1');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !problemIdentified) return;

    createIntervention({
      name,
      type,
      studentIds: ['s3', 's8'],
      groupId: selectedGroupId,
      problemIdentified,
      mentorId,
      targetDescription: targetDescription || 'Improve target metric by +15% over 4 weeks',
      baselineAvgScore: 560,
      currentAvgScore: 560,
      targetAvgScore: 720,
      startDate: new Date().toISOString().split('T')[0],
      deadline: '2026-10-30'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
            <LifeBuoy className="w-4 h-4" />
            <span>Create CDC Technical Intervention</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1">Intervention Program Title</label>
            <input
              type="text"
              placeholder="e.g. Backend Architecture & Cloud Sprint"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Action Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
              >
                <option value="Skill">Skill Development</option>
                <option value="Activity">Activity Boost</option>
                <option value="Development">GitHub & Projects</option>
                <option value="Competitive Programming">CP & LeetCode</option>
                <option value="Training">Formal Training</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Target Group</label>
              <select
                value={selectedGroupId}
                onChange={e => setSelectedGroupId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
              >
                {groups.map(g => (
                  <option key={g.id} value={g.id}>{g.name} ({g.studentIds.length} students)</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Problem Identified (Diagnosis)</label>
            <textarea
              placeholder="Describe the skill gap or activity drop detected by the platform..."
              value={problemIdentified}
              onChange={e => setProblemIdentified(e.target.value)}
              rows={2}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Target Outcome & Deadline</label>
            <input
              type="text"
              placeholder="e.g. Build 2 backend microservices and reach > 700 DSA score"
              value={targetDescription}
              onChange={e => setTargetDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Responsible Mentor</label>
            <select
              value={mentorId}
              onChange={e => setMentorId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
            >
              {mentors.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.specialization.join(', ')})</option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-950"
            >
              Start Intervention
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const CreateOpportunityModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [type, setType] = useState('Placement');
  const [deadline, setDeadline] = useState('');
  const [minScore, setMinScore] = useState(700);
  const [minGPA, setMinGPA] = useState(7.5);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
            <FolderPlus className="w-4 h-4" />
            <span>Create Opportunity & Matching Drive</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-2 text-emerald-400">
            <Check className="w-10 h-10 mx-auto animate-bounce" />
            <p className="font-semibold text-sm">Opportunity Drive Created & Candidates Matched!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Opportunity Title</label>
              <input
                type="text"
                placeholder="e.g. Microsoft SDE Intern 2026"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Company / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Microsoft"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Category Type</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="Placement">Placement</option>
                  <option value="Internship">Internship</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Training">Training</option>
                  <option value="Research">Research</option>
                  <option value="Competition">Competition</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Application Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Min Tech Score</label>
                <input
                  type="number"
                  value={minScore}
                  onChange={e => setMinScore(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Min CGPA</label>
                <input
                  type="number"
                  step="0.1"
                  value={minGPA}
                  onChange={e => setMinGPA(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-950"
              >
                Create Opportunity
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export const AddMentorModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { addMentor } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dept, setDept] = useState<Department>('CSE');
  const [designation, setDesignation] = useState('Assistant Professor');
  const [empId, setEmpId] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive' | 'On Leave'>('Active');
  const [isPrimary, setIsPrimary] = useState(false);
  const [specialization, setSpecialization] = useState('System Design, Algorithms');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addMentor({
      name,
      title: `${designation}, ${dept}`,
      designation,
      isPrimary,
      dept,
      email,
      phone: phone || '+91 98765 00000',
      assignedStudentIds: [],
      studentCount: 0,
      assignedGroupIds: [],
      assignedInterventionIds: [],
      pendingReviewsCount: 0,
      maxCapacity: 30,
      workloadPct: 0,
      workloadStatus: 'None',
      status,
      specialization: specialization.split(',').map(s => s.trim())
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg p-6 space-y-4 shadow-2xl text-slate-800 font-sans">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <UserPlus className="w-4 h-4" />
            <span>Add New CDC Mentor</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2 text-emerald-600">
            <Check className="w-10 h-10 mx-auto animate-bounce" />
            <p className="font-bold text-sm">Mentor Successfully Added!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Employee ID</label>
                <input
                  type="text"
                  placeholder="e.g. EMP-2024-89"
                  value={empId}
                  onChange={e => setEmpId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. rajesh@glbitm.ac.in"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Department</label>
                <select
                  value={dept}
                  onChange={e => setDept(e.target.value as Department)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-600 font-medium"
                >
                  <option value="CSE">CSE</option>
                  <option value="AI_DS">AIML / AI-DS</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="ME">MECH</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Designation</label>
                <select
                  value={designation}
                  onChange={e => setDesignation(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-600 font-medium"
                >
                  <option value="Assistant Professor">Assistant Professor</option>
                  <option value="Associate Professor">Associate Professor</option>
                  <option value="Professor">Professor</option>
                  <option value="Lab Lead">Lab Lead</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Status</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-600 font-medium"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Specialization Focus (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. System Design, Algorithms, Python"
                value={specialization}
                onChange={e => setSpecialization(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-blue-600 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isPrimary"
                checked={isPrimary}
                onChange={e => setIsPrimary(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-0 h-4 w-4"
              />
              <label htmlFor="isPrimary" className="text-slate-700 font-semibold">Designate as Primary Mentor</label>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs"
              >
                Add Mentor
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
