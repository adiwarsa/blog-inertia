import PrimaryButton from '@/Components/PrimaryButton.jsx';
import Modal from '@/Components/Modal.jsx';
import SecondaryButton from '@/Components/SecondaryButton.jsx';
import Select from '@/Components/Select.jsx';
import { useForm } from '@inertiajs/react';

const reasons = [
    'This is a hate speech',
    'Contains inappropriate content',
    'This is a spam',
    'This is a scam',
    'This is a fake news',
];
export default function ReportModal({ comment, show, onClose }) {
    const { data, setData, processing, post, errors } = useForm({
        reason: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('comments.reportSpam', [comment]), {
            preserveScroll: true,
            onSuccess: () => onClose(false),
        });
    }
    return (
        <Modal show={show} onClose={() => onClose(false)}>
            <div className="p-6">
                <h4 className="mb-4 text-lg font-semibold">Report Comment</h4>
                <form onSubmit={submit}>
                    <div className="mb-2">
                        <label htmlFor="reason" className="mb-2 block text-gray-500">
                            Select a reason for reporting this comment
                        </label>
                        <Select
                            placeholder="Select a reason"
                            onChange={(e) => setData('reason', e.target.value)}
                            name="reason"
                            id="reason"
                            options={reasons.map((reason, index) => ({
                                value: reason,
                                label: reason,
                            }))}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-x-1">
                        <SecondaryButton type="button" onClick={() => onClose(false)}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton type="submit">Report</PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}