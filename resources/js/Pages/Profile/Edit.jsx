import CustomerAccountLayout from '@/Layouts/CustomerAccountLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <CustomerAccountLayout
            header={
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                        Account
                    </p>
                    <h1 className="mt-1 text-2xl font-black tracking-tight md:text-3xl">
                        Profile
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Update your name, email, password, or delete your account.
                    </p>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="mx-auto w-full max-w-3xl space-y-6">
                <div className="neon-card rounded-2xl border border-border bg-card/80 p-4 shadow-elegant backdrop-blur-sm sm:p-8">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="neon-card rounded-2xl border border-border bg-card/80 p-4 shadow-elegant backdrop-blur-sm sm:p-8">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="neon-card rounded-2xl border border-border bg-card/80 p-4 shadow-elegant backdrop-blur-sm sm:p-8">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </CustomerAccountLayout>
    );
}
