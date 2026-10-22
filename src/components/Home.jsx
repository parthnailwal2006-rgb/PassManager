
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Eye,
  EyeOff,
  X,
  Save,
  Pencil,
  Trash2,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
} from "lucide-react";

import authService from "../services/AuthService";
import { setCount } from "../redux/features/auth/AuthSlice";

function getData(response) {
  return response?.data ?? response;
}

export default function Home() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.auth.count);

  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [modal, setModal] = useState(null);
  // modal: null | "add" | "view" | "edit"

  const [activeItem, setActiveItem] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");

  // Fetch the user's password titles whenever Home loads
  const fetchTitles = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = getData(await authService.viewTitle());

      if (response.success) {
        setTitles(response.titles ?? []);
      } else {
        setError(response.message || "Failed to load your vault.");
      }
    } catch (err) {
      setError(
        getData(err.response)?.message || "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTitles();
  }, [fetchTitles]);

  function openAddModal() {
    setTitle("");
    setPassword("");
    setActiveItem(null);
    setError("");
    setModal("add");
  }

  function closeModal() {
    setModal(null);
    setActiveItem(null);
    setShowPassword(false);
    setTitle("");
    setPassword("");
    setError("");
  }

  // Create a new vault entry
  async function handleSave(e) {
    e.preventDefault();

    if (!title.trim() || !password) {
      setError("Please enter both a title and a password.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = getData(
        await authService.createPassword({
          title: title.trim(),
          password,
        })
      );

      if (!response.success) {
        setError(response.message || "Failed to save password.");
        return;
      }

      // The backend should return the updated count.
      if (Number.isInteger(response.count)) {
        dispatch(setCount(response.count));
      }

      closeModal();

      // Refresh the titles after a successful save.
      await fetchTitles();
    } catch (err) {
      setError(
        getData(err.response)?.message || "Failed to save password."
      );
    } finally {
      setSaving(false);
    }
  }

  // Fetch the password for the selected card
  async function handleFetch(item) {
    setError("");
    setActiveItem(item);
    setModal("view");
    setLoading(true);

    try {
      const response = getData(await authService.viewpass());

      if (!response.success) {
        setError(response.message || "Failed to fetch password.");
        return;
      }

      // viewpass() returns the array of decrypted vault items.
      const fetchedItem = (response.items ?? []).find(
        (entry) => String(entry._id) === String(item._id)
      );

      if (!fetchedItem) {
        setError("Password entry not found. Please refresh your vault.");
        return;
      }

      setActiveItem(fetchedItem);
      setTitle(fetchedItem.title);
      setPassword(fetchedItem.password);
    } catch (err) {
      setError(
        getData(err.response)?.message || "Failed to fetch password."
      );
    } finally {
      setLoading(false);
    }
  }

  // Open the edit form with the fetched item's values
  function openEditModal() {
    if (!activeItem) return;

    setTitle(activeItem.title);
    setPassword(activeItem.password);
    setError("");
    setModal("edit");
  }

  // Assumes authService.updatePassword(id, { title, password })
  async function handleUpdate(e) {
    e.preventDefault();

    if (!activeItem || !title.trim() || !password) {
      setError("Please enter both a title and a password.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = getData(
        await authService.updatePassword(activeItem._id, {
          title: title.trim(),
          password,
        })
      );

      if (!response.success) {
        setError(response.message || "Failed to update password.");
        return;
      }

      closeModal();
      await fetchTitles();
    } catch (err) {
      setError(
        getData(err.response)?.message || "Failed to update password."
      );
    } finally {
      setSaving(false);
    }
  }

  // Assumes authService.deletePassword(id)
  async function handleDelete() {
    if (!activeItem) return;

    const confirmed = window.confirm(
      `Delete "${activeItem.title}" from your vault?`
    );

    if (!confirmed) return;

    setSaving(true);
    setError("");

    try {
      const response = getData(
        await authService.deletePassword(activeItem._id)
      );

      if (!response.success) {
        setError(response.message || "Failed to delete password.");
        return;
      }

      if (Number.isInteger(response.count)) {
        dispatch(setCount(response.count));
      }

      closeModal();
      await fetchTitles();
    } catch (err) {
      setError(
        getData(err.response)?.message || "Failed to delete password."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8 text-white">
      <div className="w-full max-w-6xl my-auto">
        {/* Header */}
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-indigo-400">
              <LockKeyhole size={21} />
              <span className="text-sm font-medium tracking-widest">
                LOCALVAULT
              </span>
            </div>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Your Password Vault
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Your saved credentials, all in one place.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs text-slate-400">Saved passwords</p>
              <p className="mt-1 text-xl font-semibold">{count ?? 0}</p>
            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-medium transition hover:bg-indigo-500"
            >
              <Plus size={19} />
              <span className="hidden sm:inline">Add Password</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </header>

        {/* Vault content */}
        {loading && !modal ? (
          <div className="flex justify-center py-24">
            <LoaderCircle
              size={32}
              className="animate-spin text-indigo-400"
            />
          </div>
        ) : error && !modal ? (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-red-300">
            <p>{error}</p>
            <button
              type="button"
              onClick={fetchTitles}
              className="mt-3 text-sm font-semibold underline"
            >
              Try again
            </button>
          </div>
        ) : titles.length === 0 ? (
          <div className="flex min-h-[330px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-5 text-center">
            <div className="mb-5 rounded-2xl bg-indigo-500/10 p-5 text-indigo-400">
              <KeyRound size={36} />
            </div>

            <h2 className="text-xl font-semibold">Your vault is empty</h2>

            <p className="mt-2 max-w-sm text-sm text-slate-400">
              Add your first password to start organizing your credentials.
            </p>

            <button
              type="button"
              onClick={openAddModal}
              className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium transition hover:bg-indigo-500"
            >
              <Plus size={19} />
              Add your first password
            </button>
          </div>
        ) : (
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Saved entries</h2>

              <button
                type="button"
                onClick={fetchTitles}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
              >
                <LoaderCircle
                  size={15}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {titles.map((item) => (
                <article
                  key={item._id}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-5 transition hover:border-indigo-500/40 hover:bg-slate-900"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="shrink-0 rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
                      <KeyRound size={22} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        ••••••••
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleFetch(item)}
                    aria-label={`Fetch ${item.title} password`}
                    className="flex shrink-0 items-center gap-2 rounded-lg bg-indigo-500/10 px-3 py-2 text-sm text-indigo-300 transition hover:bg-indigo-500/20"
                  >
                    <Eye size={16} />
                    Fetch
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Modal overlay */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-md"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !saving) closeModal();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="vault-modal-title"
            className="my-auto w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/40"
            style={{ animation: "vaultZoomIn 220ms ease-out" }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2
                  id="vault-modal-title"
                  className="text-xl font-bold"
                >
                  {modal === "add"
                    ? "Add Password"
                    : modal === "edit"
                    ? "Update Password"
                    : "Password Details"}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {modal === "view"
                    ? "Your saved credential"
                    : "Enter your credential details"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                aria-label="Close modal"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {modal === "view" && loading ? (
              <div className="flex justify-center py-12">
                <LoaderCircle
                  size={30}
                  className="animate-spin text-indigo-400"
                />
              </div>
            ) : modal === "view" && activeItem ? (
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Title
                  </label>
                  <div className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3">
                    {activeItem.title}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Password
                  </label>

                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-4 py-3">
                    <p className="min-w-0 flex-1 break-all font-mono text-sm">
                      {showPassword
                        ? activeItem.password
                        : "•".repeat(
                            Math.min(activeItem.password?.length || 8, 24)
                          )}
                    </p>

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="shrink-0 text-slate-400 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={openEditModal}
                    disabled={saving}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium transition hover:bg-white/5 disabled:opacity-50"
                  >
                    <Pencil size={17} />
                    Update
                  </button>

                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={saving}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
                  >
                    {saving ? (
                      <LoaderCircle size={17} className="animate-spin" />
                    ) : (
                      <Trash2 size={17} />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={modal === "edit" ? handleUpdate : handleSave}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="vault-title"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Title
                  </label>

                  <input
                    id="vault-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. GitHub, Gmail"
                    maxLength={100}
                    required
                    autoFocus
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="vault-password"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Password
                  </label>

                  <input
                    id="vault-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <LoaderCircle size={19} className="animate-spin" />
                  ) : (
                    <Save size={19} />
                  )}
                  {saving
                    ? "Saving..."
                    : modal === "edit"
                    ? "Save Changes"
                    : "Save Password"}
                </button>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
