import React from 'react'

export default function SideBar() {

    return (

        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="/" className="brand-link">
                    <img src="Dubai Desk1.png" alt="Dubai Desk Logo" className="brand-image img-circle elevation-3" style={{ opacity: ".8" }} />
                    <span className="brand-text font-weight-light">Dubai Desk</span>
                </a>

                <div className="sidebar">
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item menu-open">
                                <a href="/" className="nav-link">
                                    <p className="text-white nav-link">
                                        Dashboard
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item menu-open">
                                <a href="registered-users" className="nav-link">
                                    <p className="text-white nav-link">
                                        Registered users
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item menu-open">
                                <a href="workspaces" className="nav-link">
                                    <p className="text-white nav-link">
                                        Workspace Management
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item menu-open">
                                <a href="booking-requests" className="nav-link">
                                    <p className="text-white nav-link">
                                        Bookings
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item menu-open">
                                <a href="ejari-requests" className="nav-link">
                                    <p className="text-white nav-link">
                                        Ejari Requests
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item menu-open">
                                <a href="virtual-office-requests" className="nav-link">
                                    <p className="text-white nav-link">
                                        Virtual Office Requests
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item menu-open">
                                <a href="workspace-requests" className="nav-link">
                                    <p className="text-white nav-link">
                                        Workspace Requests
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item menu-open">
                                <a href="/" className="nav-link">
                                    <p className="text-white nav-link">
                                        Sales History
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item menu-open">
                                <a href="/signin" className="nav-link">
                                    <p className="text-white nav-link">
                                        Logout
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    )
}