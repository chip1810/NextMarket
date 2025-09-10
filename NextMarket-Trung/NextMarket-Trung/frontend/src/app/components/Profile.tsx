// src/components/Profile.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getCurrentUser } from '../services/authService';
import { User } from './types';

export const Profile: React.FC = () => {
    const { user, logout } = useAuth();
    const [profileData, setProfileData] = useState<User | null>(user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadProfileData();
    }, []);

    const loadProfileData = async () => {
        try {
            setLoading(true);
            setError('');
            const freshUserData = await getCurrentUser();
            setProfileData(freshUserData);
        } catch (err: any) {
            setError('Failed to load profile data');
            console.error('Profile load error:', err);
            // If token is invalid, logout
            if (err.response?.status === 401) {
                logout();
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button
                        className="btn btn-outline-danger ms-2"
                        onClick={loadProfileData}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning" role="alert">
                    No profile data available
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h3 className="mb-0">
                                <i className="bi bi-person-circle me-2"></i>
                                User Profile
                            </h3>
                            <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={loadProfileData}
                                disabled={loading}
                            >
                                <i className="bi bi-arrow-clockwise me-1"></i>
                                Refresh
                            </button>
                        </div>
                        <div className="card-body">
                            {/* Basic Info */}
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h5 className="text-primary">Basic Information</h5>
                                    <div className="mb-3">
                                        <label className="form-label"><strong>User ID:</strong></label>
                                        <p className="form-control-plaintext">{profileData.id}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label"><strong>UUID:</strong></label>
                                        <p className="form-control-plaintext text-muted">{profileData.uuid}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label"><strong>Username:</strong></label>
                                        <p className="form-control-plaintext">{profileData.username || 'Not set'}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label"><strong>Email:</strong></label>
                                        <p className="form-control-plaintext">{profileData.email}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label"><strong>Status:</strong></label>
                                        <span className={`badge ${profileData.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                                            {profileData.status || 'Unknown'}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <h5 className="text-primary">Profile Information</h5>
                                    {profileData.profile ? (
                                        <>
                                            <div className="mb-3">
                                                <label className="form-label"><strong>Full Name:</strong></label>
                                                <p className="form-control-plaintext">{profileData.profile.full_name || 'Not set'}</p>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label"><strong>Phone:</strong></label>
                                                <p className="form-control-plaintext">{profileData.profile.phone || 'Not set'}</p>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label"><strong>Gender:</strong></label>
                                                <p className="form-control-plaintext">{profileData.profile.gender || 'Not set'}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-muted">Profile information not available</p>
                                    )}
                                </div>
                            </div>

                            {/* Account Details */}
                            <div className="row">
                                <div className="col-12">
                                    <h5 className="text-primary">Account Details</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label"><strong>Account Created:</strong></label>
                                                <p className="form-control-plaintext">
                                                    {profileData.created_at ? new Date(profileData.created_at).toLocaleString() : 'Not available'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label"><strong>Last Updated:</strong></label>
                                                <p className="form-control-plaintext">
                                                    {profileData.updated_at ? new Date(profileData.updated_at).toLocaleString() : 'Not available'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            {/* Addresses Section */}
                            <div className="row mt-4">
                                <div className="col-12">
                                    <h5 className="text-primary">
                                        <i className="bi bi-geo-alt me-2"></i>
                                        Delivery Addresses
                                    </h5>
                                    {profileData.addresses && profileData.addresses.length > 0 ? (
                                        <div className="row">
                                            {profileData.addresses.map((address, index) => (
                                                <div key={address.id} className="col-md-6 mb-3">
                                                    <div className={`card ${address.is_default ? 'border-primary' : ''}`}>
                                                        <div className="card-body">
                                                            {address.is_default && (
                                                                <span className="badge bg-primary mb-2">Default Address</span>
                                                            )}
                                                            <h6 className="card-title">
                                                                {address.recipient_name || 'No Name'}
                                                            </h6>
                                                            <p className="card-text">
                                                                <strong>Phone:</strong> {address.phone || 'Not provided'}<br />
                                                                <strong>Street:</strong> {address.street || 'Not provided'}<br />
                                                                <strong>City:</strong> {address.city || 'Not provided'}<br />
                                                                <strong>Province:</strong> {address.province || 'Not provided'}<br />
                                                                <strong>Country:</strong> {address.country || 'Not provided'}<br />
                                                                <strong>Postal Code:</strong> {address.postal_code || 'Not provided'}
                                                            </p>
                                                            <small className="text-muted">
                                                                Added: {address.created_at ? new Date(address.created_at).toLocaleDateString() : 'Unknown'}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="alert alert-info">
                                            <i className="bi bi-info-circle me-2"></i>
                                            No delivery addresses found. Add your first address to get started!
                                        </div>
                                    )}

                                    <button className="btn btn-outline-primary mt-2">
                                        <i className="bi bi-plus-circle me-1"></i>
                                        Add New Address
                                    </button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-4 pt-3 border-top">
                                <div className="d-flex gap-2">
                                    <button className="btn btn-primary">
                                        <i className="bi bi-pencil me-1"></i>
                                        Edit Profile
                                    </button>
                                    <button className="btn btn-outline-secondary">
                                        <i className="bi bi-key me-1"></i>
                                        Change Password
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};