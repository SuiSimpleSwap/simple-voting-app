import { FC, useState, useEffect } from "react";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../../config/networkConfig";
import { Transaction } from "@mysten/sui/transactions";

export const CreateProposal: FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [expirationTime, setExpirationTime] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const {
    mutate: signAndExecute,
    isPending,
    isSuccess,
    error,
  } = useSignAndExecuteTransaction();
  const packageId = useNetworkVariable("packageId");
  const adminCapId = useNetworkVariable("adminCapId");
  const dashboardId = useNetworkVariable("dashboardId");

  // Clear form after successful submission
  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setDescription("");
      setExpirationDate("");
      setExpirationTime("");
      setErrors({});
    }
  }, [isSuccess]);

  // Validation function
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!expirationDate) {
      newErrors.expirationDate = "Expiration date is required";
    }

    if (!expirationTime) {
      newErrors.expirationTime = "Expiration time is required";
    }

    // Check if the selected date/time is in the future
    if (expirationDate && expirationTime) {
      const selectedDateTime = new Date(`${expirationDate}T${expirationTime}`);
      const now = new Date();
      
      if (selectedDateTime <= now) {
        newErrors.expirationDateTime = "Expiration must be in the future";
      }

      // Check if it's at least 1 hour from now
      const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
      if (selectedDateTime <= oneHourFromNow) {
        newErrors.expirationDateTime = "Expiration must be at least 1 hour from now";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Convert date and time to milliseconds
  const getExpirationTimestamp = () => {
    if (!expirationDate || !expirationTime) return 0;
    
    const dateTime = new Date(`${expirationDate}T${expirationTime}`);
    return dateTime.getTime();
  };

  // Get minimum date (today)
  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Get minimum time (current time if today is selected)
  const getMinTime = () => {
    const today = new Date().toISOString().split('T')[0];
    if (expirationDate === today) {
      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
      return oneHourLater.toTimeString().slice(0, 5);
    }
    return "00:00";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const expirationTimestamp = getExpirationTimestamp();
    
    const tx = new Transaction();
    
    // Create the proposal and assign the returned ID
    const [proposalId] = tx.moveCall({
      target: `${packageId}::proposal::create`,
      arguments: [
        tx.object(adminCapId),
        tx.pure.string(title.trim()),
        tx.pure.string(description.trim()),
        tx.pure.u64(expirationTimestamp)
      ],
    });

    // Register the proposal with the dashboard
    tx.moveCall({
      target: `${packageId}::dashboard::register_proposal`,
      arguments: [
        tx.object(dashboardId),
        tx.object(adminCapId),
        proposalId
      ],
    });

    signAndExecute({
      transaction: tx,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="create-proposal-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Proposal Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={`input ${errors.title ? 'error' : ''}`}
        />
        {errors.title && <div className="error-message">{errors.title}</div>}
      </div>

      <div className="form-group">
        <textarea
          placeholder="Proposal Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className={`input ${errors.description ? 'error' : ''}`}
        />
        {errors.description && <div className="error-message">{errors.description}</div>}
      </div>

      <div className="form-group">
        <label className="label">Expiration Date</label>
        <input
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          min={getMinDate()}
          required
          className={`input ${errors.expirationDate ? 'error' : ''}`}
        />
        {errors.expirationDate && <div className="error-message">{errors.expirationDate}</div>}
      </div>

      <div className="form-group">
        <label className="label">Expiration Time</label>
        <input
          type="time"
          value={expirationTime}
          onChange={(e) => setExpirationTime(e.target.value)}
          min={getMinTime()}
          required
          className={`input ${errors.expirationTime ? 'error' : ''}`}
        />
        {errors.expirationTime && <div className="error-message">{errors.expirationTime}</div>}
      </div>

      {errors.expirationDateTime && (
        <div className="error-message global-error">{errors.expirationDateTime}</div>
      )}

      {expirationDate && expirationTime && (
        <div className="timestamp-preview">
          <p className="preview-label">Preview:</p>
          <p className="preview-text">
            Expires: {new Date(`${expirationDate}T${expirationTime}`).toLocaleString()}
          </p>
          <p className="preview-subtext">
            Timestamp: {getExpirationTimestamp()}ms
          </p>
        </div>
      )}

      <button type="submit" disabled={isPending} className="btn">
        {isPending ? "Creating..." : "Create Proposal"}
      </button>
      
      {isSuccess && <div className="success-message">Proposal created successfully!</div>}
      {error && <div className="error-message">{error.message}</div>}
    </form>
  );
};
